
import type Koa from 'koa';
import cookieModule from 'cookie';
import cookieParser from 'cookie-parser';

declare module 'koa' {
  interface Request {
    token?: string;
  }
}

export type CookieOptions = (
  | {
      signed?: true;
      secret: string | string[];
    }
  | {
      signed?: false;
      secret?: string | string[];
    }
) & { key?: string };

export type Options = {
  queryKey?: string;
  bodyKey?: string;
  headerKey?: string;
  reqKey?: string;
  cookie?: CookieOptions | false;
};

const getCookie = (serializedCookies: string, key: string) =>
  cookieModule.parse(serializedCookies)[key] ?? false;

export function bearerToken<
  StateT = Koa.DefaultState,
  ContextT = Koa.DefaultContext,
>(opts: Options = {}): Koa.Middleware<StateT, ContextT> {
  const queryKey = opts.queryKey ?? 'access_token';
  const bodyKey = opts.bodyKey ?? 'access_token';
  const headerKey = opts.headerKey ?? 'Bearer';
  const reqKey = opts.reqKey ?? 'token';
  const cookie = opts.cookie ?? false;
  const cookieKey = cookie && cookie.key ? cookie.key : 'access_token';
