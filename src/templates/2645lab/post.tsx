import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { Disqus } from 'gatsby-plugin-disqus'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import * as React from 'react'
import Layout from '../../components/2645lab/layout'
import Alert from '../../components/alert'
import Hr from '../../components/hr'
import ScrollToTop from '../../components/scroll-to-top'
import SEO from '../../components/seo';
import SimplePagination from '../../components/simple-pagination'
import styles from './post.module.styl'

export default class extends React.Component<any> {

  constructor(props: any) {
    super(props)
  }

  public componentDidMount() {
    if (top.MathJax) {
      top.MathJax.Hub.Queue(['Typeset', top.MathJax.Hub])
    }
  }

  public componentDidUpdate() {
    if (top.MathJax) {
      top.MathJax.Hub.Queue(['Typeset', top.MathJax.Hub])
    }
  }

  public render() {
    const { post, previous, next, site } = this.props.data
    const disqusConfig = {
      url: `${site.siteMetadata.siteUrl + this.props.location.pathname}`,
      identifier: post.slug,
      title: post.title,
    }
    const pd = new Date(post.publish_at)
    const d = this.dateOfUpdate()
    return (
      <Layout>
        <SEO title={post.title} description={post.childMdx.excerpt} />
        <div className={styles.post}>
          <h1>{post.title}</h1>
          <div className={styles.authorMeta}>
            {
              post.is_repost ?
                <><span>由 </span>
                  <span className={styles.author}>
                    {post.author.name}
                  </span>
                  <span> 转载</span>
                </> : <span className={styles.author}>
                    {post.author.name}
                  </span>
            }
            ，
            <span className={styles.publishTime}>
              {pd.getFullYear()}-{pd.getMonth() + 1}-{pd.getDate()}
            </span>
          </div>
          {
            this.dayByUpdate() > 365 ?
              <Alert
                content={`本文最后更新于 ${
                  this.dayByUpdate()
                  } 天前（${
                  d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()
                  }），其中的信息可能已经有所发展或者不再适用于现阶段。`}
                level="warn"
              /> : ''
          }
          <Alert
            content={`本文全长 ${
              this.countWords()
              } 字，全部读完大约需要 ${
              this.timeToRead()
              } 分钟。`}
            level="info"
          />
          <MDXProvider components={{
            hr: Hr,
            alert: Alert,
          }}>
            <MDXRenderer>{post.childMdx.body}</MDXRenderer>
          </MDXProvider>
        </div>
        <div className={styles.copyrightNotice}>
          {
            post.childCopyrightNotice ?
              <MDXRenderer>
                {post.childCopyrightNotice.childMdx.body}
              </MDXRenderer> :
              <>
                除特殊说明以外，本网站文章采用 <a
                  target="_blank"
                  href="http://creativecommons.org/licenses/by-sa/4.0/">
                    知识共享署名-相同方式共享 4.0 国际许可协议
                </a> 进行许可。
              </>
          }
        </div>
        <SimplePagination
          previousName={previous ? `上一篇：${previous.title}` : '已是第一篇'}
          previousUrl={previous ? `/posts/${previous.slug}` : ''}
          nextName={next ? `下一篇：${next.title}` : '已是最后一篇'}
          nextUrl={next ? `/posts/${next.slug}` : ''}
        />
        <Disqus className={styles.disqus} config={disqusConfig} />
        <ScrollToTop />
      </Layout>
    )
  }

  private dateOfUpdate(): Date {
    const { post } = this.props.data
    return new Date(post.update_at || post.publish_at)
  }

  private dayByUpdate(): number {
    return Math.floor(
      (new Date().getTime() - this.dateOfUpdate().getTime()) / 86400000)
  }

  private countWords(): number {
    const str = this.props.data.post.childMdx.rawBody
    const matches = str.match(/[\u00ff-\uffff]|\S+/g)
    return matches ? matches.length : 0
  }

  private timeToRead(): number {
    return Math.ceil(this.countWords() / 350)
  }

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
          body
        }
      }
      childMdx {
        headings {
          depth
          value
        }
        body
        rawBody
        excerpt(pruneLength: 200)
      }
      is_public
      is_repost
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
