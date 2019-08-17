import { graphql, Link } from 'gatsby'
import * as React from 'react'

import Authors from '../../components/2645lab/authors'
import Layout from '../../components/2645lab/layout'
import AuthorTag from '../../components/author-tag'
import Button from '../../components/button'
import '../../components/font.css'
import ScrollToTop from '../../components/scroll-to-top'
import SEO from '../../components/seo'
import SimplePagination from '../../components/simple-pagination'
import authors from '../../static/authors'
import styles from './index.module.styl'

interface IndexState {
  nightMode: boolean
}

export default class extends React.Component<any, IndexState> {

  constructor(props: any) {
    super(props)
    this.state = {
      nightMode: false
    }
  }

  public render() {
    const { data } = this.props
    const { nodes, pageInfo } = data.allPost
    return (
      <Layout onNightModeToggled={nightMode => this.setState({ nightMode })}>
        <SEO title="Home" />
        <Authors authors={authors} />
        {nodes.map((node: any, index: number) => {
          const d = new Date(node.publish_at)
          return (
            <div key={node.slug} className={styles.post}>
              <Link to={`/posts/${node.slug}`}>
                <h2 className={styles.title}>
                  <AuthorTag key={index}
                             background={
                               this.getBackgroundByAuthor(
                                 node.is_repost ? 'repost' : node.author.name,
                                 this.state.nightMode,
                               )
                             }
                             name={node.is_repost ? '转载' : node.author.name}
                             avatarUrl={node.author.avatar} />
                  <span>
                  {node.title}
                    <time dateTime={node.publish_at}> — {
                      `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
                    }</time>
                </span>
                </h2>
              </Link>
              <p>
                {node.childMdx.excerpt}
                <Link to={`/posts/${node.slug}`}>
                  <Button text="阅读全文"
                          background={
                            this.getBackgroundByAuthor(
                              node.is_repost ? 'repost' : node.author.name,
                              this.state.nightMode,
                            )
                          }
                  />
                </Link>
              </p>
            </div>
          )
        })}
        {
          (pageInfo.hasNextPage || pageInfo.hasPreviousPage)
            ? <SimplePagination
              previousName={pageInfo.hasNextPage ? '更早以前' : ''}
              previousUrl={`/pages/${pageInfo.currentPage + 1}`}
              nextName={pageInfo.hasPreviousPage ? '更新以后' : ''}
              nextUrl={`/pages/${pageInfo.currentPage - 1}`}
              force2col={true} showIcon={true}
            /> : ''
        }
        <ScrollToTop />
      </Layout>
    )
  }

  private getBackgroundByAuthor(name: string, nightMode?: boolean): string {
    const author = authors.find(a => a.name === name)
    if (author && author.backgroundColor) {
      return nightMode ? author.backgroundColorDark : author.backgroundColor
    }
    if (name === 'repost') return nightMode ? '#007542' : '#9ac71b'
    else return  nightMode ? '#ee8e00' : '#f4c900'
  }

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
          excerpt(pruneLength: 300)
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