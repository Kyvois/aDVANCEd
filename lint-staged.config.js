module.exports = {
  '*package.json': ['prettier-package-json --write'],
  '*.(js|ts)': ['eslint --fix', 'prettier -