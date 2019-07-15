import { css } from '@emotion/core'
import * as React from 'react'
import styles from './hr.module.styl'

export interface HrProps {
  content: string
}

export default (props: HrProps) => (
  <hr className={styles.hr} css={css`
    &:after {
      content: '${props.content}';
    }
`} />
)
