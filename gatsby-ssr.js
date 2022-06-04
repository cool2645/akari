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
  replacePreBodyComponents,
  getPostBodyComponents,
  replacePostBodyComponents
}) => {
  const headComponents = getHeadComponents()
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
        __html: "(localStorage.getItem('userNightMode') === 'true' || localStorage.getItem('userNightMode') !== 'false' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) && (document.body.className = 'nightly')"
      }}
    />
  )
  replacePreBodyComponents(preBodyComponents)
  const postBodyComponents = getPostBodyComponents()
  postBodyComponents.push(
    <kokoro-provider>
      <kokoro-player
        lang="zh_Hans"
        top="100"
        left="0"
        mobileDefaultSide="right"
      />
    </kokoro-provider>
  )
  replacePostBodyComponents(postBodyComponents)
}
