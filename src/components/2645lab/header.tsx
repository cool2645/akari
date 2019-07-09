import * as React from 'react'
import paint from '../../images/paint.svg'
import styles from "./header.module.styl"

export interface HeaderProps {
  siteTitle: string
}

const Header = (props: HeaderProps) => (
  <header>
    <div className={styles.headerImg}>
      <img src={paint} alt="title" />
      <div className={styles.banner}>
        <h1>
          {props.siteTitle}
        </h1>
      </div>
    </div>
  </header>
)

export default Header
