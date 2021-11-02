
# 2.0.2 / 2021.08.30

- [fix] Move dev deps to devDependencies

# 2.0.1 / 2021.08.21

- [fix] fix wrong `files` setting in the `package.json` file

# 2.0.0 / 2021.08.21

- [new] add TypeScript support
- [new] support `access_token` in signed or non-signed cookie
- [breaking] support node `>= 12`
- [breaking] use named export instead of `module.export`:

Before:

```js
const bearerToken = require('koa-bearer-token');
```

After:

```js
const { bearerToken } = require('koa-bearer-token');
```

# 1.0.0 / 2018.01.21

- Compatibility with Koa@2 was added
- Dependencies were updated
- A little refactoring was made