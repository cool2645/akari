/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
require('prismjs/themes/prism.css')

if (
  window.navigator.userAgent.indexOf('Firefox') === -1 &&
  window.navigator.userAgent.indexOf('Chrome') !== -1
) {
  console.warn(
    '嘿！还在用吃相难看的 Chrome/Chromium 浏览器吗，换 Firefox 试试吧'
  )
  console.warn(
    '下载专为开发者定制的 Firefox Developer Edition：https://www.mozilla.org/zh-CN/firefox/developer/'
  )
  console.warn('让我们一同反对垄断，捍卫隐私安全，维护网络中立')
}
