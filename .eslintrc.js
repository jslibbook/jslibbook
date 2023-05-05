module.exports = {
  env: {
    // 设置全局变量
    browser: true, // 支持浏览器全局便利
    es2021: true,
    node: true,
    mocha: true, // 解决 describe 报错问题
  },
  // extends: ['eslint:recommended'],
  // extends: ['eslint:recommended', 'plugin:prettier/recommended'], // 方案2
  extends: ['eslint:recommended', 'prettier'], // 方案1
  overrides: [],
  parserOptions: {
    // 希望支持的js语法
    ecmaVersion: 'latest', // js 支持版本
    // ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['prettier'], // 方案1
  rules: {
    'prettier/prettier': 2, // 'error', // 方案1
    'no-prototype-builtins': 0,
    'no-unused-vars': 0,
    quotes: 0,
    'no-unexpected-multiline': 2,
    semi: 'error',
    indent: ['error', 2],
  },
}
