import { css } from '@emotion/react'
import * as React from 'react'

import * as styles from './hr.module.styl'

export interface HrProps {
  content: string
}

export default (props: HrProps) => (
  <hr
    className={styles.hr}
    css={css`
    &::after {
      content: '${props.content || '◇'}';
    }
`}
  />
)
