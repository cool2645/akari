import { css } from '@emotion/core'
import * as React from 'react'
import styles from './button.module.styl'
import './font.css'

export interface ButtonProps {
  text: string
  href?: string
  background?: string
}

export default (props: ButtonProps) => (
  <div className={styles.buttonWrap}>
    <h3 className={styles.buttonText}>{props.text}</h3>
    <div
      className={styles.button}
      css={css`
        border-bottom-color: ${props.background};
      `}
    />
  </div>
)
