import { COOKIE_NAME, SESSION_SECRET } from "$env/static/private";
import { setAuthCookie } from "$lib/auth/auth0";
import { privateRoutes } from "$lib/consts";
import type { User } from "$lib/types/user";
import jwt from "jsonwebtoken";

export const handle = async ({ event, resolve }) => {
  const cookie = event.cookies.get(COOKIE_NAME);
  const url = new URL(event.request.url);

  console.log("session cookie", cookie);
  console.log("url pathName", url.pathname);

  if (cookie) {
    // Extend the cookie
    const user = jwt.verify(cookie, SESSION_SECRET) as User;
    setAuthCookie(event.cookies, user);
    return await resolve(event);
  }

  // We need to check if the privateRoutes array contains the current path or part of it
  // If it does, we need to redirect the user to the login page

  const isPrivateRoute = privateRoutes.some((route) =>
    url.pathname.includes(route)
  );

  if (!cookie && isPrivateRoute) {
    return new Response("LoginRequired", {
      status: 302,
      headers: { location: `/api/auth/login?returnUrl=${url.pathname}` },
    });
  }
  return await resolve(event);
};
