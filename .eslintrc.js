module.exports = {
  env: {
    // 设置全局变量
    browser: true, // 支持浏览器全局便利
    es2021: true,
    node: true,
    mocha: true, // 解决 describe 报错问题
  },
  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    // 希望支持的js语法
    ecmaVersion: 'latest', // js 支持版本
    // ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {},
};
