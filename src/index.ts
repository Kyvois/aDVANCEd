
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

  if (cookie && cookie.signed && !cookie.secret) {
    throw new Error(
      '[koa-bearer-token]: You must provide a secret token to cookie attribute, or disable signed property',
    );
  }

  return (ctx, next) => {
    const { body, header, query } = ctx.request;

    let count = 0;
    let token;

    if (query && query[queryKey]) {
      token = query[queryKey];
      count += 1;
    }

    if (body && body[bodyKey]) {
      token = body[bodyKey];
      count += 1;
    }

    if (header) {
      if (header.authorization) {