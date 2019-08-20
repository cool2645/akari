import { Link } from 'gatsby'
import * as React from 'react'
import styles from './header.module.styl'

export interface HeaderProps {
  siteTitle: string
}

const Header = (props: HeaderProps) => (
  <header>
    <div className={styles.headerImg}>
      <div className={styles.img} />
      <div className={styles.banner}>
        <Link to="/" className={styles.title} >
          <h1>
            {props.siteTitle}
          </h1>
        </Link>
      </div>
    </div>
  </header>
)

export default Header
