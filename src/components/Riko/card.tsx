import { css } from '@emotion/core'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import * as React from 'react'
import styles from './card.module.styl'

interface CardProps {
  time: string
  via: string
  href: string
  cover_url?: string
  cover_height?: string
  children: any
}

export default (props: CardProps) => {
  const via = props.via.startsWith('!Twitter') ?
    <> <FontAwesomeIcon icon={faTwitter as any} /> {
      props.via.slice('!Twitter'.length)
    }</>: props.via
  const coverImg = <img alt="cover"
                        className={props.cover_height ? styles.abs : ''}
                        src={props.cover_url} />
  return <div className={styles.card}>
    {
      props.cover_url ?
        props.href.startsWith('/') ? <Link to={props.href}>
            { coverImg }
          </Link>
          : <a href={props.href} target="_blank">
            { coverImg }
          </a>
         : ''
    }
    {
      props.cover_height ?
        <div css={css`
          height: 0;
          padding-bottom: ${props.cover_height};
        `} /> : ''
    }
    <div className={styles.cardContent}>
      { props.children }
      <footer>
        <span><time>{ new Date(props.time).toLocaleString() }</time></span><span>{
        props.href.startsWith('/') ? <Link to={props.href}>来自 { via }</Link>
          : <a href={props.href} target="_blank">来自 { via }</a>
      }</span>
      </footer>
    </div>
  </div>
}
