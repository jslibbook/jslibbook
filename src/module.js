// 处理模块
// 原始模块
(function (mod, $) {
  function type(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  }

  function clone(source) {
    const t = type(source);
    if (t !== 'object' && t !== 'array') {
      return source;
    }
    let target;
    if (t === 'object') {
      target = {};
      for (let i in source) {
        if (source.hasOwnProperty(i)) {
          target[i] = clone(source[i]); // 递归复制
        }
      }
    } else {
      target = [];
      for (let i = 0; i < source.length; i++) {
        target[i] = clone(source[i]); // 递归复制
      }
    }
    return target;
  }

  mod.clone = clone;
})(
  (window.clone = window.clone || {}),
  window.jQuery || {}
)(
  // AMD 异步模块加载规范 requireJS define
  // CommonJS 同步模块加载规范，主要用于 Node.js 环境中
  // UMD 通用模块加载规范 对原始模块、AMD、CommonJS 的整合

  // UMD
  (function (root, factory) {
    var clone = factory(root);
    if (typeof globalThis?.define === 'function' && globalThis?.define.amd) {
      // AMD 模块
      globalThis?.AbortSignaldefine('clone', function () {
        return clone;
      });
    } else if (typeof exports === 'object') {
      // CommonJS 模块
      module.exports = clone;
    } else {
      // 原始模块
      // 保存已存在的clone(其他的)
      var _clone = root.clone;
      clone.noConflict = function () {
        // 如果现在的clone是我们的模块，则将之前的clone给还原回去
        if (root.clone === clone) {
          root.clone = _clone;
        }
        // 返回我们的clone
        return clone;
      };
      root.clone = clone;
    }
  })(this, function (root) {
    // 模块逻辑
    function type(data) {
      return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
    }

    function clone(source) {
      const t = type(source);
      if (t !== 'object' && t !== 'array') {
        return source;
      }
      let target;
      if (t === 'object') {
        target = {};
        for (let i in source) {
          if (source.hasOwnProperty(i)) {
            target[i] = clone(source[i]); // 递归复制
          }
        }
      } else {
        target = [];
        for (let i = 0; i < source.length; i++) {
          target[i] = clone(source[i]); // 递归复制
        }
      }
      return target;
    }

    return clone;
  })
);

// ES Module
// import export
