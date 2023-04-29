const expect = require('expect.js')

describe('单元测试', () => {
  // 测试套件 test suite
  describe('test hello', () => {
    // 测试用例 test case
    it('hello', () => {
      // 断言
      expect(1).to.equal(1)
      // 相等或者不想等
      expect(4 + 5).to.be.equal(9)
      expect(4 + 5).to.not.be.equal(10)
      // 布尔值
      expect('everything').to.be.ok
      expect('').to.not.be.ok
      // include
      expect([1, 2, 3]).to.contain(1) // include 不能用
      expect('foobar').to.contain('foo')
      expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo')
      // empty
      expect([]).to.be.empty
      expect('').to.be.empty
      expect({}).to.be.empty
      // match
      expect('foobar').to.match(/^foo/)
    })
  })
})
