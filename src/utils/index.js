/**
 * 获取url中的参数值
 * @param {string} key
 * @returns { string | undefined }
 */
export const getUrlParam = (key) => {
  const query =
    location.search[0] === '?' ? location.search.slice(1) : location.search
  const map =
    query.split('&').reduce((data, key) => {
      const arr = key.split('=')
      data[arr[0]] = arr[1]
      return data
    }, {}) || {}
  return map[key]
}
