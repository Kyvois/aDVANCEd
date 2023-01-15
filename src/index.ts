
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