import {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  COOKIE_NAME,
  JWKS_URL,
  SESSION_SECRET,
} from "$env/static/private";
import { PUBLIC_BASE_URL } from "$env/static/public";
import type { User } from "$lib/types/user";
import type { Cookies } from "@sveltejs/kit";
import type { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";

let cachedKey: string | undefined = undefined;

const COOKIE_DURATION_SECONDS = 60 * 60 * 24 * 7; // 1 week

function getKey(header: JwtHeader, callback: SigningKeyCallback) {
  const client = new JwksClient({ jwksUri: JWKS_URL });

  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      callback(err);
    }
    if (cachedKey) {
      callback(null, cachedKey);
    } else {
      const signingKey = key?.getPublicKey();
      cachedKey = signingKey;
      callback(null, signingKey);
    }
  });
}

export async function verifyToken<T>(token: string): Promise<T> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, {}, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload as T);
      }
    });
  });
}

export async function getToken({ code }: { code: string }) {
  const resp = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
    method: "POST",
    body: JSON.stringify({
      code,
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      redirect_uri: `${PUBLIC_BASE_URL}/api/auth/callback`,
      grant_type: "authorization_code",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await resp.json();
}

export const getAuthUser = (cookies: Cookies) => {
  const jwtToken = cookies.get(COOKIE_NAME);

  if (!jwtToken) {
    return null;
  }

  return jwt.decode(jwtToken) as User;
};

export const setAuthCookie = (cookies: Cookies, user: User) => {
  const cookieValue = jwt.sign(user, SESSION_SECRET);
  cookies.set(COOKIE_NAME, cookieValue, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: COOKIE_DURATION_SECONDS,
    path: "/",
  });
};
