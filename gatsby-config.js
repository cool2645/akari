const path = require('path')

module.exports = {
  siteMetadata: {
    title: '2645 实验室',
    description: '2645 实验室是 2645 工作室的技术博客。',
    author: '梨子',
    authors: [
      {
        name: 'Bittersweet',
        avatarUrl:
          'https://secure.gravatar.com/avatar/9f6bc88b62a0055492fd5ae916678aa5?s=96&d=mm&r=g',
        homeUrl: '/Bittersweet/',
        guestBookUrl: '/Bittersweet/about/',
        friendsUrl: '/Bittersweet/friends/',
        backgroundColor: '#a5dbf7',
        backgroundColorDark: '#005eae',
        color: ''
      },
      {
        name: '梨子',
        avatarUrl:
          'https://secure.gravatar.com/avatar/06bd7a0d2a6c1d0dc78758ecb0a99b88?s=96&d=mm&r=g',
        homeUrl: '/Riko/',
        guestBookUrl: '/Riko/about/',
        friendsUrl: '/Riko/friends/',
        backgroundColor: '#f5bbd4',
        backgroundColorDark: '#d10080',
        color: ''
      }
    ],
    siteUrl: 'https://blog.cool2645.com'
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-dts-css-modules',
    'gatsby-plugin-webpack-bundle-analyser-v2',
    'gatsby-plugin-stylus',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src/images')
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: '2645实验室',
        short_name: '2645实验室',
        start_url: '/',
        background_color: '#ee8e00',
        theme_color: '#ee8e00',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: 'tomato',
        showSpinner: false
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    // remove old blog.cool2645.com service-worker
    {
      resolve: 'gatsby-plugin-remove-serviceworker',
      options: {
        filename: 'service-worker.js'
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allPost } }) => {
              return allPost.nodes.map(node => {
                return Object.assign(
                  {},
                  {
                    title: node.title,
                    description: node.excerpt,
                    date: node.publish_at,
                    url: `${site.siteMetadata.siteUrl}/posts/${node.slug}`,
                    guid: `${site.siteMetadata.siteUrl}/posts/${node.slug}`
                  }
                )
              })
            },
            query: `
              {
                allPost(
                  filter: {
                    is_public: { eq: true }
                    category: { slug: { eq: "2645lab" } }
                  }
                  sort: { order: DESC, fields: publish_at }
                ) {
                  nodes {
                    childMdx {
                      excerpt(pruneLength: 300, truncate: true)
                    }
                    slug
                    publish_at
                    title
                  }
                }
              }
            `,
            output: '/feed.xml',
            title: '2645 实验室',
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/posts/'
          }
        ]
      }
    },
    'gatsby-plugin-force-trailing-slashes',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/Bittersweet/essays/*']
      }
    },
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: 'https://cms.cool2645.com',
        queryLimit: 1000, // Default to 100
        collectionTypes: ['post', 'essay', 'author', 'category']
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          'gatsby-remark-mathjax',
          'gatsby-remark-external-links',
          'gatsby-remark-unwrap-images',
          {
            resolve: 'gatsby-remark-images-medium-zoom',
            options: {
              margin: 15
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: {
                sh: 'shell'
              },
              aliases: {},
              showLineNumbers: false
            }
          }
        ],
        plugins: [
          'gatsby-remark-images-medium-zoom'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-disqus',
      options: {
        shortname: '2645-shi-yan-shi'
      }
    },
    {
      resolve: 'gatsby-source-twitter',
      options: {
        credentials: {
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
          access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        },
        queries: {
          rikorikorilove: {
            endpoint: 'statuses/user_timeline',
            params: {
              screen_name: '_satou_riko',
              include_rts: true,
              exclude_replies: true,
              tweet_mode: 'extended',
              count: 100
            }
          }
        }
      }
    }
  ]
}
