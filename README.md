# koa-bearer-token

[![npm version](https://badge.fury.io/js/koa-bearer-token.svg)](https://npmjs.org/package/koa-bearer-token)
[![Build Status](https://github.com/chentsulin/koa-bearer-token/workflows/CI/badge.svg?branch=master)](https://github.com/chentsulin/koa-bearer-token/actions?query=branch%3Amaster)
[![Coverage Status](https://coveralls.io/repos/github/chentsulin/koa-bearer-token/badge.svg?branch=master)](https://coveralls.io/r/chentsulin/koa-bearer-token?branch=master)

> Bearer token parser middleware for koa

Inspired by [express-bearer-token](https://www.npmjs.com/package/express-bearer-token)

## Installation

```sh
$ npm install koa-bearer-token
```

## What?

Per [RFC6750](https://datatracker.ietf.org/doc/html/rfc6750) this module will attempt to extract a bearer token from a request from these locations:

- The key `access_token` in the request body.
- The key `access_token` in the request query params.
- The value from the header `Authorization: Bearer <token>`.
- (Optional) Get a token from cookies header with key `access_token`.

If a token is found, it will be stored on `ctx.request.token`. If one has been provided in more tha