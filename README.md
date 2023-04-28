# 现代 Javascript 库开发

想法 => 目标 => 设计 => 编码

[源代码](https://github.com/jslib-book/jslib-book-code)
[勘误](https://github.com/jslib-book/jslib-book-code/issues)

### 一些注意事项

rollup 版本: 书中是 0.57.1，项目目前使用的是最新的 3.20.6, 有问题再切换回去(切换回去了)

### 踩坑

似乎 rollup(不注明，都是以 0.57.1 版本为例) 打包，只能从 esmodule 转向其他包，commonjs 不能转化为 esmodule
遇到错误：

> Cannot find module '@babel/preset-plugin-transform-runtime' from
> If you want to resolve "@babel/plugin-transform-runtime", use "module:@babel/plugin-transform-runtime"
>
> - Did you accidentally pass a preset as a plugin?

用 npm 下载包有错误提示

> rollup@">=0.60.0 <1" from rollup-plugin-babel@4.0.3
> 升级 rollup 版本至 0.60.7

原来是将 plugin 放在了 preset 中导致的
把 rollup 改回去

又报错

> Error: 'default' is not exported by node_modules/.pnpm/@babel+runtime-corejs2@7.12.5/node_modules/@babel/runtime-corejs2/core-js/array/from.js
> 解决方案 1: @rollup/plugin-commonjs，但当前 rollup 版本不支持（要求 1.20.0）
> [打包报错 Error: ‘default‘ is not exported](https://devpress.csdn.net/viewdesign/643769e0986c660f3cf9389c.html)
> 解决方案 2: rollup-plugin-commonjs rollup-plugin-node-resolve（rollup@">=0.60.0 <1"）
> [rollup 从入门到打包一个按需加载的组件库](https://zhuanlan.zhihu.com/p/486644411?utm_id=0) > [使用 rollup 打包 JS 的方法步骤](https://www.mianshigee.com/note/detail/63156yth/)
> rollup 提供了插件 rollup-plugin-commonjs ，以便于在 rollup 中引用 commonjs 规范的包。该插件的作用是将 commonjs 模块转成 es6 模块。
> rollup-plugin-commonjs 通常与 rollup-plugin-node-resolve 一同使用，后者用来解析依赖的模块路径。
> format: 'umd' 的模式下才需要

### 测试

兼顾测试覆盖率和效率
控制变量法，按照参数分组，对于每个参数，分别设置正确的参数、错误的参数以及边界值，对于其他的参数，而对于其他的参数给一个正确的固定值即可，保证其他参数影响本参数的测试
对于同一个类型的输入，只需要设计一个用例即可

#### 方法差异

equal: 全等
eql: 值相等（深拷贝适合用这个来比较）

#### 单元测试覆盖率

基于 Istanbul (npm 包叫 nyc) 来做单元测试覆盖率

##### 语句覆盖率 Statement Coverage

##### 分支覆盖率 Branch Coverage

##### 函数覆盖率 Function Coverage

##### 行覆盖率 Line Coverage

#### 源代码覆盖率

打包后的代码有一些构建工具生成的代码
原理：先向源代码中插入测试代码覆盖率的代码，再调用 Babel 进行构建，将构建好的代码传递给 Mocha 进行测试，这样就得到了源代码的测试覆盖率

> pnpm i @babel/register@7.0.0 babel-plugin-istanbul@5.1.0 cross-env@5.2.0 -D

#### 踩坑

##### ReferenceError: window is not defined

解决：[node.js - mocha 命令给出 ReferenceError : window is not defined](https://www.coder.work/article/103442)

> npm install --save-dev --save-exact jsdom jsdom-global
> 然后将 -r jsdom-global/register 添加到你的 mocha 命令行。当您重新运行测试时，window is not defined 错误将消失。

##### Cannot use import statement outside a module

.nycrc 中增加配置
[解决 mocha 测试时 `cannot use import statement outside a module` 错误，以及配置 travis](https://blog.meathill.com/test/how-tofix-mocha-cannot-use-import-statement-outside-a-module-and-add-travis-configuration.html)

```typescript
"require": [
  "@babel/register"
]
```

##### 发布 npm 包

[npm ERR! 404 Not Found - Scope not found](https://www.cnblogs.com/shanejix/p/15652257.html)

### 警告

rollup-plugin-babel 4.0.3
└── ✕ unmet peer rollup@">=0.60.0 <1": found 0.57.1
把 rollup 升级到 0.57.1 => 0.60.7

##### 测试覆盖率都为 0

```typescript
// window.xx = Array.from('abc') // ['a', 'b', 'c']
```

上面代码屏蔽的情况下，代码测试覆盖率都为 0, 放开后就正常了

```typescript
export function clone(source) {
  // ...
}
```

导出就正常了，。。。。。。奇葩

```typescript
export const clone = (source) => {
  // ...
};
```

这种也不行
export default clone 和 export function clone 缺失测试覆盖率就为 0 了

### Puppeteer

用 Puppeteer 来自动化测试户
[Puppeteer 使用指南 - 在 Node.js 下模拟浏览器](https://www.zhihu.com/tardis/bd/art/622256649)

[自研前端性能监控平台之 Puppeteer 篇](https://zhuanlan.zhihu.com/p/523035204)

[自研前端性能监控平台之 Lighthouse 篇](https://zhuanlan.zhihu.com/p/471838481)

[自研前端性能监控平台之 Lighthouse 定制篇](https://zhuanlan.zhihu.com/p/478877904)

[puppeteer docs](https://pptr.dev/)

[puppeteer github](https://github.com/puppeteer/puppeteer)

### 代码风格

[搞懂 ESLint 和 Prettier](https://zhuanlan.zhihu.com/p/80574300)

#### prettier

格式化代码
.prettierrc.json 配置文件
.prettierignore 忽略文件

pretty-quick --staged 只格式化待提交代码

npx husky set .husky/pre-commit "npx pretty-quick --staged"

#### husky

读音： /ˈhʌski/
方便实用 git 的 hook
npx husky-init

#### eslint

pnpm i eslint -D
npx eslint --init

##### rules

{
a: 0,
}
关闭: 0 或 'off'
警告: 1 或 'warn'
错误: 2 或 'error'
也可以是数组，第一个字表示规则级别，后面的值是某个规则的一些参数
[ESLint Rules 规则配置说明](https://blog.51cto.com/u_15812097/5723258)

#### 解决 prettier 和 eslint 规则冲突

使用 eslint-plugin-prettier 或 eslint-config-prettier

##### eslint-plugin-prettier

eslint 对 Prettier 的代码风格进行检查，如果发现不符合 Prettier 代码风格的地方聚会报错，其余阿里时先使用 Prettier 对代码进行格式化，然后与格式化之前的代码惊醒对比，如果发现不一致，就会报错
即标记 Prettier 中的错误

```typescript
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": 2 // 'error',
  }
}
```

##### eslint-config-prettier

// eslint-config-plugin 这个插件是啥

将 ESLint 和 Prettier 中冲突的规则都关闭，因为保存的时候会用 Prettier 去格式化代码，所以实际上用的是 Prettier 的规则

配置一

````typescript
{
  "plugins": ["prettier"],
  "extends": [
    "eslint:recommended",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": 2 // 'error',
  }
}
```
配置二
```typescript
{
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
}
````

#### 文章

[一文读懂 eslint 和 prettier](https://blog.csdn.net/weixin_43664308/article/details/128717523)

> eslint: 提供一个插件化的 javascript 代码检测工具，他是一个检测工具，包含 js 语法以及少部分格式问题，在 eslint 看来，语法对了就能保证代码正常允许，格式问题属于其次
> prettier: 一个“有态度”的代码格式化工具，支持多种语言
> [全面搞懂 ESLint 与 Prettier](https://blog.csdn.net/jayccx/article/details/128851057) > [前端规范：eslint 与 prettier 使用](https://blog.csdn.net/weixin_45077178/article/details/107226551)
