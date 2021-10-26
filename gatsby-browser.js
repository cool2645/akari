/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const { version } = require('./package.json')

if (
  navigator.userAgent.indexOf('Firefox') === -1 &&
  navigator.userAgent.indexOf('AppleWebKit') !== -1
) {
  if (navigator.userAgent.indexOf('Chrome') !== -1) {
    console.warn('EVIL MONOPOLIST Google IS UNDERMINING NETWORK NEUTRALITY.')
    console.warn('Read more: https://news.ycombinator.com/item?id=18064537')
  } else {
    console.warn('EVIL MONOPOLIST Apple IS KILLING THE WEB.')
    console.warn('Read more: https://httptoolkit.tech/blog/safari-is-killing-the-web/')
  }
  console.warn(
    'Try Firefox Developer Edition, specially designed for web developers: https://www.mozilla.org/firefox/developer/'
  )
  console.warn(
    "Its performance is comparable to Chrome's nowadays, moreover, comes with better privacy protection and awesome tools that Chrome lacks."
  )
}

window.akari = {
  version,
  console: {}
}

const script = document.createElement('script')
script.src = '//unpkg.com/kokoro-player/dist/kokoro-player.min.js'
script.onload = () => {
  window.akari.player = new window.KokoroPlayer.Kokoro()
  const script2 = document.createElement('script')
  script2.src = '//cdn.innocent.love/wulunheshiyizhi.js?t=' + Math.random()
  document.body.appendChild(script2)
  window.customElements.define('kokoro-provider',
    window.KokoroPlayer.Provider.connect(window.akari.player))
}
document.body.appendChild(script)

const webfontjs = document.createElement('script')
webfontjs.src = '//cdn.jsdelivr.net/npm/webfontloader@1/webfontloader.min.js'
webfontjs.onload = () => {
  window.WebFont.load({
    google: {
      families: ['Noto Serif SC']
    },
    custom: {
      families: ['LXGWWenkai'],
      urls: ['https://cdn.jsdelivr.net/gh/satouriko/LxgwWenKai_Webfonts/dist/LXGWWenKai-Regular.css']
    }
  })
}
document.body.appendChild(webfontjs)

console.log(
  `\n %c © 2645 实验室 | Akari v${window.akari.version} %c \n\n`,
  'color:#fefefe;background:linear-gradient(to right,#58c8f2,#eda4b2);padding:5px 0;border-top-left-radius:5px;border-bottom-left-radius:5px;',
  'color:#fefefe;background:#eda4b2;padding:5px 0;border-top-right-radius:5px;border-bottom-right-radius:5px;'
)
