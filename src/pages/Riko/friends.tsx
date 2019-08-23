import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { Disqus } from 'gatsby-plugin-disqus';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import * as React from 'react';
import Alert from '../../components/alert';
import Hr from '../../components/hr';
import Layout from '../../components/Riko/layout';
import ScrollToTop from '../../components/scroll-to-top';
import SEO from '../../components/seo';
import styles from '../../templates/2645lab/post.module.styl';
import styles2 from './friends.module.styl';

export default ({ data, location }: any) => {
  const disqusConfig = {
    url: `${data.site.siteMetadata.siteUrl + location.pathname}`,
    identifier: data.post.slug,
    title: data.post.title
  }
  return (
    <Layout>
      <SEO title="友情链接" siteTitle="梨园" />
      <h1>{data.post.title}</h1>
      <div className={`${styles.post} ${styles2.post}`}>
        <MDXProvider components={{
          hr: Hr,
          alert: Alert
        }}>
          <MDXRenderer>{data.post.childMdx.body}</MDXRenderer>
        </MDXProvider>
        <p />
        <Alert
          content="需要更新链接请留言哦~"
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
    post: post(slug: { eq: "riko-friends" }) {
      childMdx {
        headings {
          depth
          value
        }
        body
      }
      publish_at
      update_at
      slug
      title
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
