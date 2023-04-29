const puppteer = require('puppeteer')
const ora = require('ora')
const colors = require('colors')

const prefix = '[browser]'
const spinner = ora(`${prefix} start browser test...`).start()

const check = async ({ page, browser, pngPath }) => {
  await page.waitFor('.suite')
  // 通过
  const passNodes = await page.$$('.pass')
  // 失败
  const failNodes = await page.$$('.fail')
  spinner.stop()
  if (passNodes && passNodes.length != null) {
    console.log(`${prefix}: 通过 ${passNodes.length} 项`.green)
  }
  if (failNodes && failNodes.length) {
    console.log(
      `${prefix}: 失败 ${failNodes.length} 项`.red,
      '具体见：',
      `${pngPath}`.underline
    )
    await browser.close()
    process.exit(1)
  }
  console.log(prefix, `🎉 用例全部通过浏览器测试 🎉`.green)
}

;(async () => {
  const testPath = `file://${__dirname}/index.html`
  const headless = false
  const browser = await puppteer.launch({
    headless,
  })
  const page = await browser.newPage()
  await page.goto(testPath)
  // 截屏并保存
  const pngPath = `${__dirname}/browser.png`
  await page.screenshot({ path: pngPath, fullPage: true })

  /* --- 占位符 --- */
  await check({ page, browser, pngPath })
  // 关闭浏览器
  await new Promise((resolve) => {
    setTimeout(async () => {
      await browser.close()
      resolve()
    }, 10 * 1000)
  })
})()
