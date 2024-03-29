import { css } from '@emotion/react'
import { Link } from 'gatsby'
import * as React from 'react'

import * as styles from './authors.module.styl'

export interface AuthorProps {
  name: string
  childFile: {
    publicURL: string
  }
  homeUrl: string
  guestBookUrl: string
  friendsUrl: string
}

interface ListItemProps {
  text: string
  href: string
  avatarUrl?: string
}

const ListItem = (props: ListItemProps) => (
  <li className={`${styles.listItem}`}>
    <div className={styles.b0}>
      {
        !props.href
          ? <span>{props.text}</span>
          : <Link to={props.href}>{props.text}</Link>
      }
    </div>
    <div className={styles.b1} >
      {props.avatarUrl
        ? <div
          className={styles.img}
          css={css`
            background-image: url("${props.avatarUrl}");
          `}
        />
        : ''}
    </div>
    <div className={styles.b2} />
  </li>
)

const List = (props: AuthorProps) => {
  const listItemsData = [
    { text: props.name, avatarUrl: props.childFile.publicURL, href: props.homeUrl },
    { text: '留言板', href: props.guestBookUrl },
    { text: '友情链接', href: props.friendsUrl }
  ]
  return (
    <ul className={styles.list} >
      {listItemsData.map((data, index) => (
        <ListItem
          key={index}
          {...data}
        />
      ))}
    </ul>
  )
}

export default (props: { authors: AuthorProps[] }) => {
  return (
    <div className={styles.authorsRow}>
      {
        props.authors.map((author, index) => (
          <List {...author} key={index} />
        ))
      }
    </div>
  )
}
