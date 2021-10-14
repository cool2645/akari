/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require('react')
const { dom } = require('@fortawesome/fontawesome-svg-core')

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
  getPreBodyComponents,
  replacePreBodyComponents
}) => {
  const headComponents = getHeadComponents()
  headComponents.push(...[
    <link key="googleapis" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="gstatic" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />,
    <link key="noto-serif" href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap" rel="stylesheet" />,
    <link
      key="lxgw-webfont"
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/satouriko/LxgwWenKai_Webfonts/dist/LXGWWenKai-Regular.css"
    />,
    <script key="script" defer>

    </script>
  ])
  headComponents.push(
    <style
      id="fontawesome-ssr"
      key="fontawesome-ssr"
      dangerouslySetInnerHTML={{ __html: dom.css() }}
    />
  )
  headComponents.push(
    <script
      key="mathjax"
      src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"
      async={true}
    />
  )
  headComponents.push(
    <meta
      key="google-search-console"
      name="google-site-verification"
      content="vfBieEK9GH8ZUhz0vrwxJDaNOXdq8ztAv21tboXSCVI"
    />
  )
  replaceHeadComponents(headComponents)
  const preBodyComponents = getPreBodyComponents()
  preBodyComponents.unshift(
    <script
      key="prefers-dark-mode"
      dangerouslySetInnerHTML={{
        __html: "window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && (document.body.className = 'nightly')"
      }}
    />
  )
  replacePreBodyComponents(preBodyComponents)
}
