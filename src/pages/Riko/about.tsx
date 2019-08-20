import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-mdx';
import { Disqus } from 'gatsby-plugin-disqus';
import * as React from 'react';
// @ts-ignore
import { siteMetadata } from '../../../gatsby-config'
import Alert from '../../components/alert';
import Hr from '../../components/hr';
import Layout from '../../components/Riko/layout';
import ScrollToTop from '../../components/scroll-to-top';
import styles from '../../templates/2645lab/post.module.styl';

export default ({ data, location }: any) => {
  const disqusConfig = {
    url: `${siteMetadata.url + location.pathname}`,
    identifier: data.post.slug,
    title: data.post.title
  }
  return (
    <Layout>
      <h1>{data.post.title}</h1>
      <div className={styles.post}>
        <MDXProvider components={{
          hr: Hr,
          alert: Alert
        }}>
          <MDXRenderer>{data.post.childMdx.code.body}</MDXRenderer>
        </MDXProvider>
        <Alert
          content="和文章无关的留言就写在这里吧~"
          level="info"
        />
        <Disqus className={styles.disqus} config={disqusConfig} />
        <ScrollToTop />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    post: post(slug: { eq: "about-riko" }) {
      childMdx {
        headings {
          depth
          value
        }
        code {
          body
        }
      }
      publish_at
      update_at
      slug
      title
    }
  }
`