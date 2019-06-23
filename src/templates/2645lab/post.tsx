import { graphql } from 'gatsby'
import * as React from 'react'
import Layout from '../../components/layout'
import { MDXRenderer } from 'gatsby-mdx'

export default ({ data }: any) => {
  console.log(data)
  const post = data.post
  return (
    <Layout>
      <div>
        <h1>{post.title}</h1>
        <MDXRenderer>{post.childMdx.code.body}</MDXRenderer>
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
