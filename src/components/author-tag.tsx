import { css } from '@emotion/core'
import * as React from 'react'
import styles from './author-tag.module.styl'

export interface AuthorTagProps {
  avatarUrl: string
  background: string
  name: string
}

export default (props: AuthorTagProps) => (
  <div
    className={styles.authorTag}
    css={css`
      background: ${props.background};
    `}
  >
    <img src={props.avatarUrl} alt="avatar" />
    <span>{props.name}</span>
  </div>
)
