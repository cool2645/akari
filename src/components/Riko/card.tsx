import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import * as React from 'react';
import styles from './card.module.styl';

interface CardProps {
  time: string
  via: string
  href: string
  cover_url?: string
  children: any
}

export default (props: CardProps) => {
  const via = props.via.startsWith('!Twitter') ?
    <> <FontAwesomeIcon icon={faTwitter as any} /> {
      props.via.slice('!Twitter'.length)
    }</>: props.via
  return <div className={styles.card}>
    { props.cover_url ? <img alt="cover"
           src={props.cover_url} /> : '' }
    <div className={styles.cardContent}>
      { props.children }
      <footer>
        · { new Date(props.time).toLocaleString() } · {
        props.href.startsWith('/') ? <Link to={props.href}>来自 { via }</Link>
          : <a href={props.href} target="_blank">来自 { via }</a>
      } ·
      </footer>
    </div>
  </div>
}
