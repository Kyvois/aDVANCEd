
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import request from 'supertest';
import cookie from 'cookie-signature';

import { bearerToken, Options } from '..';

const token = '1234567890abcdefghijk';
const secret = 'SUPER_SECRET';

function setup(options: Options = {}) {
  const app = new Koa();

  app.use(bodyParser());
  app.use(bearerToken(options));

  return app;
}

it('token should be undefined when no token provided', async () => {
  const app = setup();

  let requestToken;
  app.use((ctx) => {
    requestToken = ctx.request.token;
  });

  await request(app.callback()).get('/');

  expect(requestToken).toBeUndefined();
});

it('finds a bearer token in post body under "access_token" and sets it to request.token', async () => {