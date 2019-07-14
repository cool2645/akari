import { graphql, Link } from 'gatsby'
import * as React from 'react'

import Authors from '../../components/2645lab/authors'
import Button from '../../components/2645lab/button'
import AuthorTag from '../../components/2645lab/author-tag'
import '../../components/2645lab/font.css'
import Layout from '../../components/2645lab/layout'
import SEO from '../../components/seo'
import authors from '../../static/authors'
import styles from './index.module.styl'

function getBackgroundByAuthor(name: string): string {
  const author = authors.find(a => a.name === name)
  if (author && author.backgroundColor) {
    return author.backgroundColor
  }
  if (name === 'repost') return '#9ac71b'
  else return '#f4c900'
}

export default ({ data }: any) => {
  console.log(data)
  return (
    <Layout>
      <SEO title="Home" />
      <Authors authors={authors} />
      <nav>
        <ul className={styles.nav}>
          <li><Link to={'/'}>文章</Link></li>
          <li><Link to={'/archive'}>归档</Link></li>
          <li><Link to={'/posts/about'}>关于</Link></li>
        </ul>
      </nav>
      {data.allPost.nodes.map((node: any, index: number) => {
        const d = new Date(node.publish_at)
        return (
          <div key={node.slug} className={styles.post}>
            <Link to={`/posts/${node.slug}`}>
              <h2 className={styles.title}>
                <AuthorTag key={index}
                           background={getBackgroundByAuthor(node.is_repost ? 'repost' : node.author.name)}
                           name={node.is_repost ? '转载' : node.author.name}
                           avatarUrl={node.author.avatar} />
                <span>
                  {node.title}
                  <time dateTime={node.publish_at}>— {
                    `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
                  }</time>
                </span>
              </h2>
            </Link>
            <p>
              {node.childMdx.excerpt}
              <Link to={`/posts/${node.slug}`}>
                <Button text="阅读全文"
                        background={getBackgroundByAuthor(node.is_repost ? 'repost' : node.author.name)} />
              </Link>
            </p>
          </div>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allPost(
      filter: { is_public: { eq: true }, category: { slug: { eq: "2645lab" } } }
      limit: $limit
      skip: $skip
      sort: { order: DESC, fields: publish_at }
    ) {
      nodes {
        category {
          slug
        }
        title
        slug
        childMdx {
          excerpt
        }
        author {
          avatar
          name
        }
        publish_at
        is_repost
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        perPage
      }
      totalCount
    }
  }
`
