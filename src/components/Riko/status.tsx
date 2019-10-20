import autobind from 'autobind-decorator'
import * as React from 'react'
import Masonry from 'react-masonry-component'

import Hr from '../hr'
import ScrollToTop from '../scroll-to-top'

import EssayCard from './essay-card'
import PostCard from './post-card'
import styles from './status.module.styl'
import TwitterCard from './twitter-card'

interface StatusPageProps {
  data: any
}

interface StatusPageState {
  displayedNodes: any
}

export default class extends React.Component<StatusPageProps, StatusPageState> {

  private readonly perPage = 20

  constructor (props: StatusPageProps) {
    super(props)
    this.state = {
      displayedNodes: props.data.allStatus.nodes.slice(0, this.perPage)
    }
  }

  public componentDidMount () {
    // tslint:disable-next-line: strict-type-predicates
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.checkAndLoadMore)
    }
  }

  public componentWillUnmount () {
    // tslint:disable-next-line: strict-type-predicates
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.checkAndLoadMore)
    }
  }

  public render () {
    return (
      <div className={styles.container}>
        <h1>最近动态</h1>
        <Masonry
          updateOnEachImageLoad={true}
        >
          {
            this.state.displayedNodes.map((node: any) => (
              <div
                key={node.slug || node.id_str || node.id}
                className={styles.statusCard}
              >
                {
                  node.type === 'twitter' ?
                    <TwitterCard
                      time={node.publish_at}
                      full_text={node.full_text}
                      url={`https://twitter.com/rikorikorilove/status/${node.id_str}`}
                      extended_entities={
                        node.extended_entities ||
                        (node.retweeted_status ? node.retweeted_status.extended_entities
                          : null)
                      }
                      source={node.source}
                      retweeted_status={node.retweeted_status}
                      childFile={node.childFile}
                    />
                    : node.type === 'post' ? <PostCard
                      time={node.publish_at}
                      title={node.title}
                      excerpt={node.childMdx.excerpt}
                      slug={node.slug}
                    />
                    : node.type === 'essay' ? <EssayCard
                      time={node.publish_at}
                      content={node.content}
                      category={node.category.name}
                      url={''}
                      childFile={node.childFile}
                    /> : ''
                }
              </div>
            ))
          }
        </Masonry>
        <div id="end" />
        <Hr content="到底了" />
        <ScrollToTop />
      </div>
    )
  }

  private getElementTop (element: HTMLElement | null) {
    if (element === null) return 0
    let actualTop = element.offsetTop
    let current = element.offsetParent
    while (current !== null) {
      actualTop += (current as HTMLElement).offsetTop
      current = (current as HTMLElement).offsetParent
    }
    return actualTop
  }

  @autobind
  private checkAndLoadMore () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const eleTop = this.getElementTop(document.querySelector(`.${styles.statusCard}:last-child`))
    const windowHeight = (window as any).visualViewport
      ? (window as any).visualViewport.height : window.innerHeight + 100
    if (scrollTop + windowHeight >= eleTop) this.showMore()
  }

  private showMore () {
    if (this.state.displayedNodes.length === this.props.data.allStatus.nodes.length) {
      return
    }
    if (this.state.displayedNodes.length + this.perPage >= this.props.data.allStatus.nodes.length) {
      this.setState({
        displayedNodes: this.props.data.allStatus.nodes
      })
      return
    }
    this.setState({
      displayedNodes: this.props.data.allStatus.nodes.slice(
        0, this.state.displayedNodes.length + this.perPage
      )
    })
  }
}
