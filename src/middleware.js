import { COOKIE_NAME } from 'config';
import { FAKE_COOKIE } from 'config';
import { PROXY_URL } from 'config';
import { NextResponse } from 'next/server';
import { LINKS } from 'utils/constants/enums';
import fetchAdapter from '@vespaiach/axios-fetch-adapter';
import axios from 'axios';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const protectedPages = Object.values(LINKS)
    .filter((p) => p.protected && p.path !== LINKS.home.path)
    .map((p) => p.path);
  const isProtectedPage =
    pathname === LINKS.home.path ||
    protectedPages.some((p) => pathname.startsWith(p.replace(/\:[^]*/, '')));

  if (isProtectedPage) {
    const cookie = req.cookies.get(COOKIE_NAME);
    let redirect = false;

    if (cookie && cookie !== FAKE_COOKIE) {
      const axiosInstance = axios.create({
        adapter: fetchAdapter,
      });

      try {
        const authStatus = await axiosInstance.get(
          `${PROXY_URL}/auth/is-authenticated`,
          {
            headers: {
              cookie: `${COOKIE_NAME}=${cookie}`,
            },
          }
        );
        redirect = !authStatus.data.id;
      } catch (err) {
        redirect = true;
      }
    } else {
      redirect = !cookie;
    }

    if (redirect) {
      const url = req.nextUrl.clone();
      url.pathname = LINKS.signIn.path;
      url.search = `redirect=${pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
