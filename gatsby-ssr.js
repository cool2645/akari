import { MDXProvider } from '@mdx-js/react'

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
  replaceHeadComponents(headComponents)
}
