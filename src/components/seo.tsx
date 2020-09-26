/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import Helmet from 'react-helmet'

function SEO ({ description, lang, meta, title, siteTitle, publishedTime, author, cover }: any) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaList = [
    {
      content: metaDescription,
      name: 'description'
    },
    {
      content: 'Medium',
      property: 'al:android:app_name'
    },
    {
      content: title,
      property: 'og:title'
    },
    {
      content: siteTitle,
      property: 'og:site_name'
    },
    {
      content: metaDescription,
      property: 'og:description'
    },
    {
      content: 'website',
      property: 'og:type'
    },
    {
      content: author,
      name: 'author'
    },
    {
      content: 'summary',
      name: 'twitter:card'
    },
    {
      content: author || site.siteMetadata.author,
      name: 'twitter:creator'
    },
    {
      content: title,
      name: 'twitter:title'
    },
    {
      content: metaDescription,
      name: 'twitter:description'
    }
  ]
  if (publishedTime) {
    metaList.push({
      content: publishedTime,
      name: 'article:published_time'
    })
  }
  if (cover) {
    metaList.push({
      content: cover,
      name: 'og:image'
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | ${siteTitle || site.siteMetadata.title}`}
      meta={metaList.concat(meta)}
    />
  )
}

SEO.defaultProps = {
  description: '',
  lang: 'en',
  meta: []
}

SEO.propTypes = {
  author: PropTypes.string,
  cover: PropTypes.string,
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  publishedTime: PropTypes.string,
  siteTitle: PropTypes.string,
  title: PropTypes.string.isRequired
}

export default SEO
