const expect = require('expect.js')
const JSDOM = require('jsdom-global')
const { getUrlParam } = require('../src/utils')

describe('获取当前 URL 中的参数', () => {
  before(() => {
    JSDOM(undefined, { url: 'htpps://www.test.com/?a=1' })
  })
  it('参数(id)的值1', () => {
    expect(getUrlParam('a')).to.be.equal('1')
  })
  it('参数(id)的值2', () => {
    expect(getUrlParam('b')).to.be.equal(undefined)
  })
})
