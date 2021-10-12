import { MDXProvider } from '@mdx-js/react'
import { Disqus } from 'gatsby-plugin-disqus'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import * as React from 'react'

import * as styles from '../../templates/2645lab/post.module.styl'
import Alert from '../alert'
import Hr from '../hr'
import ScrollToTop from '../scroll-to-top'

import * as styles2 from './friends.module.styl'

export default ({ post, disqusConfig, children }: any) => {
  return (
    <>
      <h1>{post.title}</h1>
      <div className={`${styles.post} ${styles2.post}`}>
        <MDXProvider
          components={{
            alert: Alert,
            hr: Hr
          }}
        >
          <MDXRenderer>{post.childMdx.body}</MDXRenderer>
        </MDXProvider>
        <p />
        {children}
        <Disqus className={styles.disqus} config={disqusConfig} />
        <ScrollToTop />
      </div>
    </>
  )
}
