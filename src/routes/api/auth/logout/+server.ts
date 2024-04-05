import {
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  COOKIE_NAME,
} from "$env/static/private";
import { PUBLIC_BASE_URL } from "$env/static/public";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = ({ cookies, url }) => {
  // we need to remove the loggedIN cookie
  cookies.delete(COOKIE_NAME, { path: "/" });

  return new Response(null, {
    status: 302,
    headers: {
      location: `https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${PUBLIC_BASE_URL}`,
    },
  });
};
