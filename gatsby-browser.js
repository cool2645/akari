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
  console.warn("You don't need Chrome.")
  console.warn(
    "Firefox's performance is comparable to Chrome's nowadays and comes with awesome tools and better privacy protection that Chrome lacks."
  )
  console.warn(
    'If you still cannot make up your mind, at least you give it a try. Download the Firefox Developer Edition, specially designed for web developers: https://www.mozilla.org/firefox/developer/'
  )
  console.warn('Privacy and network neutrality matter.')
}

window.akari = {
  version,
  console: {}
}

console.log(
  `\n %c © 2645 实验室 | Akari v${window.akari.version} %c \n\n`,
  'color:#fefefe;background:linear-gradient(to right,#ee8e00,#f4c900,#fff796);padding:5px 0;border-top-left-radius:5px;border-bottom-left-radius:5px;',
  'color:#fefefe;background:#fff796;padding:5px 0;border-top-right-radius:5px;border-bottom-right-radius:5px;'
)
