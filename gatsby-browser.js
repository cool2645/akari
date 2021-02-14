/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

require('prismjs/themes/prism.css')
const { version } = require('./package.json')

if (
  navigator.userAgent.indexOf('Firefox') === -1 &&
  navigator.userAgent.indexOf('Chrome') !== -1
) {
  console.warn('EVIL MONOPOLIST Google IS UNDERMINING NETWORK NEUTRALITY.')
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
  window.customElements.define('kokoro-provider',
    window.KokoroPlayer.Provider.connect(window.akari.player))
}
document.body.appendChild(script)

console.log(
  `\n %c © 2645 实验室 | Akari v${window.akari.version} %c \n\n`,
  'color:#fefefe;background:linear-gradient(to right,#58c8f2,#eda4b2);padding:5px 0;border-top-left-radius:5px;border-bottom-left-radius:5px;',
  'color:#fefefe;background:#eda4b2;padding:5px 0;border-top-right-radius:5px;border-bottom-right-radius:5px;'
)
