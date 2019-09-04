import * as React from 'react'

import styles from './alert.module.styl'

export interface AlertProps {
  content: string
  level: 'info' | 'warn' | 'danger'
}

export default (props: AlertProps) => (
  <div className={`${styles.alert} ${styles[props.level]}`}>
    {props.content}
  </div>
)
