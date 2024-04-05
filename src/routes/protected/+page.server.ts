// We need to retrieve the user in the session cookie

import { COOKIE_NAME } from "$env/static/private";
import { getAuthUser } from "$lib/auth/auth0.js";

// in the load function
export async function load({ cookies, url }) {
  const user = getAuthUser(cookies);

  const token = cookies.get(COOKIE_NAME);

  if (!user) {
    return {
      status: 302,
      headers: {
        location: `/api/auth/login?returnUrl=${url.pathname}`,
      },
    };
  }

  return {
    props: {
      user: user,
      token: token,
    },
  };
}
