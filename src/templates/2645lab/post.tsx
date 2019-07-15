import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-mdx'
import * as React from 'react'
import Layout from '../../components/2645lab/layout'
import styles from './post.module.styl'

import Hr from '../../components/post/hr'

export default ({ data }: any) => {
  console.log(data)
  const post = data.post
  return (
    <Layout>
      <div className={styles.post}>
        <h1>{post.title}</h1>
        <MDXProvider components={{
          hr: Hr,
        }}>
          <MDXRenderer>{post.childMdx.code.body}</MDXRenderer>
        </MDXProvider>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $previous: String, $next: String) {
    previous: post(slug: { eq: $previous }) {
      title
      slug
    }
    next: post(slug: { eq: $next }) {
      title
      slug
    }
    post: post(slug: { eq: $slug }) {
      author {
        name
        avatar
      }
      category {
        name
        slug
      }
      childCopyrightNotice {
        childMdx {
          code {
            body
          }
        }
      }
      childMdx {
        headings {
          depth
          value
        }
        code {
          body
        }
        timeToRead
        wordCount {
          words
        }
      }
      is_public
      is_repost
      publish_at
      slug
      title
    }
  }
`
