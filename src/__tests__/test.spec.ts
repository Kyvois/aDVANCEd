
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
  const app = setup();

  let requestToken;
  app.use((ctx) => {
    requestToken = ctx.request.token;
  });

  await request(app.callback()).post('/').send({ access_token: token });

  expect(requestToken).toBe(token);
});

it('finds a bearer token in query string under "access_token" and sets it to request.token', async () => {
  const app = setup();

  let requestToken;
  app.use((ctx) => {
    requestToken = ctx.request.token;
  });

  await request(app.callback()).get('/').query({ access_token: token });

  expect(requestToken).toBe(token);
});

it('finds a bearer token in headers under "authorization: bearer" and sets it to request.token', async () => {
  const app = setup();

  let requestToken;
  app.use((ctx) => {
    requestToken = ctx.request.token;
  });

  await request(app.callback())
    .get('/')
    .set('Authorization', `Bearer ${token}`);

  expect(requestToken).toBe(token);
});

it('finds a bearer token in post body under an arbitrary key and sets it to request.token', async () => {
  const app = setup({ bodyKey: 'test' });

  let requestToken;
  app.use((ctx) => {