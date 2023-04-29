const expect = require('expect.js')
// const { clone } = require('../dist/index.js')
const { clone } = require('../src/index.js')

describe('clone function test', () => {
  it('正确的测试用例', () => {
    // 基本类型
    expect(clone('test')).to.be.equal('test')
    expect(clone(123)).to.be(123)
    expect(clone(true)).to.be(true)
    // 放在边界值去测试了
    // expect(clone(null)).to.be(null)
    // expect(clone(undefined)).to.be(undefined)
    // 思考：一种类型只测一种，这儿是指基本类型，还是一种字符串或布尔类型，还是在不同的语境下不一样
    // 作者应该是指的基本类型只需要一种

    // 数组
    const arr = [1, 2, 3]
    const cloneArr = [...arr]
    expect(clone(cloneArr)).to.be.eql(arr)
    expect(clone(cloneArr)).not.to.equal(cloneArr) // 不能严格等于自己
    // 对象
    const obj = { a: { b: 1 } }
    const cloneObj = clone(obj)
    expect(cloneObj).not.be.equal(obj) // 不能严格等于自己
    expect(cloneObj).to.eql(obj)
  })

  it('边界值测试用例', () => {
    expect(clone()).to.eql(undefined)
    expect(clone(null)).to.eql(null)
  })
})
