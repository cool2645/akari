import { css } from '@emotion/core'
import autobind from 'autobind-decorator'
import * as React from 'react'

import styles from './toc.module.styl'

export interface Heading {
  depth: number
  value: string
}

export interface TocProps {
  className?: string
  toc: Heading[]
  currentHeadingIndex: number
  onChangeCurrentHeading?: (headingIndex: number) => void
}

export default class extends React.Component<TocProps> {
  private readonly leftMargin = 10
  private readonly headingEls: Array<HTMLLIElement | null>
  private scrollContainerEl: HTMLDivElement | null

  constructor (props: any) {
    super(props)
    this.headingEls = []
  }

  public componentDidUpdate (prevProps: TocProps) {
    if (this.props.currentHeadingIndex !== prevProps.currentHeadingIndex) {
      const currentHeadingEl = this.headingEls[this.props.currentHeadingIndex] as HTMLLIElement
      const scrollContainerEl = this.scrollContainerEl as HTMLDivElement
      if (!currentHeadingEl || !scrollContainerEl) return
      if (scrollContainerEl.scrollTop + scrollContainerEl.offsetHeight <
        currentHeadingEl.offsetTop + currentHeadingEl.offsetHeight) {
        scrollContainerEl.scrollTo(0,
          currentHeadingEl.offsetTop + currentHeadingEl.offsetHeight - scrollContainerEl.offsetHeight)
      } else {
        while (scrollContainerEl.scrollTop > 0 &&
        scrollContainerEl.scrollTop + 2 * currentHeadingEl.offsetHeight > currentHeadingEl.offsetTop) {
          scrollContainerEl.scrollTo(0, currentHeadingEl.offsetTop - 2 * currentHeadingEl.offsetHeight)
        }
      }
    }
  }

  public render () {
    const minDepth = this.props.toc.reduce((acc, curr) => Math.min(acc, curr.depth), Infinity)
    const onHeaderClick = (e: React.MouseEvent<HTMLAnchorElement>) => this.onHeadingClick(0, e)
    return (
      <div className={`${styles.toc} ${this.props.className}`}>
        <div className={`${styles.header} ${this.props.currentHeadingIndex === 0 ? styles.focus : ''}`}>
          <a href="#" onClick={onHeaderClick}>
            <div className={`${styles.anchor} ${0 === this.props.currentHeadingIndex ? '' : styles.anchorHide}`}>
              <div className={styles.anchorDot} />
            </div>
            <strong
              css={css`
                      margin-left: ${this.leftMargin}px;
                   `}
            >
              - TOC -
            </strong>
          </a>
        </div>
        <div className={styles.scrollContainer} ref={(ref) => this.scrollContainerEl = ref}>
          <ul>
            {
              this.props.toc.map((toc, index) => {
                index++
                const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => this.onHeadingClick(index, e)
                return (
                  <li
                    className={this.props.currentHeadingIndex === index ? styles.focus : ''}
                    css={(toc.depth - minDepth === 0) ? css`
                    position: sticky;
                    top: 0;
                    z-index: ${10 - toc.depth};
                  ` : css`z-index: ${10 - toc.depth};`}
                    key={index}
                    ref={(ref) => this.headingEls[index] = ref}
                  >
                    <a href={`#${toc.value}`} onClick={onClick} >
                      <div className={`${styles.anchor} ${index === this.props.currentHeadingIndex ? '' : styles.anchorHide}`}>
                        <div className={styles.anchorDot} />
                      </div>
                      <div className={styles.text}>
                      <span
                        css={css`
                          margin-left: ${this.leftMargin + (toc.depth - minDepth) * 10}px;
                        `}
                      >
                        {toc.value}
                      </span>
                      </div>
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }

  @autobind
  private onHeadingClick (index: number, e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    if (this.props.onChangeCurrentHeading instanceof Function) {
      this.props.onChangeCurrentHeading(index)
    }
  }
}
