import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { Disqus } from 'gatsby-plugin-disqus'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import * as React from 'react'

import Layout from '../../components/2645lab/layout'
import Alert from '../../components/alert'
import Hr from '../../components/hr'
import Img from '../../components/img'
import ScrollToTop from '../../components/scroll-to-top'
import SEO from '../../components/seo'
import SimplePagination from '../../components/simple-pagination'
import TOC from '../../components/toc'
import { useHeadingWaypoint } from '../../hooks/use-heading-waypoint'
import { useMathJax } from '../../hooks/use-mathjax'

import styles from './post.module.styl'

export default (props: any) => {

  useMathJax()
  const { articleRef, currentHeadingIndex, setCurrentHeadingIndex } = useHeadingWaypoint()

  const { post, previous, next, site } = props.data

  function dateOfUpdate (): Date {
    return new Date(post.update_at || post.publish_at)
  }

  function dayByUpdate (): number {
    return Math.floor(
      (new Date().getTime() - dateOfUpdate().getTime()) / 86400000)
  }

  function countWords (): number {
    const str = props.data.post.childMdx.rawBody
    const matches = str.match(/[\u00ff-\uffff]|\w+/g)
    return matches ? matches.length : 0
  }

  function timeToRead (): number {
    return Math.ceil(countWords() / 350)
  }

  const disqusConfig = {
    identifier: post.slug,
    title: post.title,
    url: `${site.siteMetadata.siteUrl + props.location.pathname}`
  }
  const pd = new Date(post.publish_at)
  const d = dateOfUpdate()
  return (
    <Layout>
      <SEO
        author={post.author.name}
        description={post.childMdx.excerpt}
        publishedTime={pd.toISOString()}
        title={post.title}
      />
      <article className={`${styles.post} ${styles.article}`} ref={articleRef}>
        <h1>{post.title}</h1>
        <header>
          {
            post.childMdx.headings.length > 1 ?
              <div className={styles.tocContainer}>
                <TOC
                  className={styles.toc}
                  currentHeadingIndex={currentHeadingIndex}
                  onChangeCurrentHeading={setCurrentHeadingIndex}
                  toc={post.childMdx.headings}
                />
              </div> : ''
          }
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
            dayByUpdate() > 365 ?
              <Alert
                content={`本文最后更新于 ${
                  dayByUpdate()
                } 天前（${
                  d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()
                }），其中的信息可能已经有所发展或者不再适用于现阶段。`}
                level="warn"
              /> : ''
          }
          <Alert
            content={`本文全长 ${
              countWords()
            } 字，全部读完大约需要 ${
              timeToRead()
            } 分钟。`}
            level="info"
          />
        </header>
        <MDXProvider
          components={{
            alert: Alert,
            hr: Hr,
            img: Img
          }}
        >
          <MDXRenderer>{post.childMdx.body}</MDXRenderer>
        </MDXProvider>
      </article>
      <div className={styles.copyrightNotice}>
        {
          post.childCopyrightNotice ?
            <MDXRenderer>
              {post.childCopyrightNotice.childMdx.body}
            </MDXRenderer> :
            <>
              除特殊说明以外，本网站文章采用 <a
                target="_blank"
                href="http://creativecommons.org/licenses/by-sa/4.0/"
                rel="nofollow noopener noreferrer"
              >知识共享署名-相同方式共享 4.0 国际许可协议
              </a> 进行许可。
            </>
        }
      </div>
      {
        post.is_public ?
          <SimplePagination
            previousName={previous ? `上一篇：${previous.title}` : '已是第一篇'}
            previousUrl={previous ? `/posts/${previous.slug}/` : ''}
            nextName={next ? `下一篇：${next.title}` : '已是最后一篇'}
            nextUrl={next ? `/posts/${next.slug}/` : ''}
          /> : ''
      }
      <Disqus className={styles.disqus} config={disqusConfig} />
      <ScrollToTop />
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
        excerpt(pruneLength: 200, truncate: true)
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
