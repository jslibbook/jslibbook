/**
 * 当字符串 str 的长度小于count时，在字符串左侧填充指定字符
 * @param {string} str
 * @param {number} count
 * @param {stirng} [ch]
 */
const leftpad = (str, count, ch = '0') => {
  return `${[...Array(count)].map(() => ch)}${str}`.slice(-count)
}
export default leftpad
