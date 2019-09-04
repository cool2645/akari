import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import * as React from 'react'

import styles from './simple-pagination.module.styl'

export interface SimplePaginationProps {
  previousName: string
  previousUrl: string
  nextName: string
  nextUrl: string
  force2col?: boolean
  showIcon?: boolean
}

export default (props: SimplePaginationProps) => (
  <div
    className={`${styles.simplePagination} ${
      props.force2col ? styles.force2row : ''
    }`}
  >
    {props.nextName ? (
      <div className={`${styles.link} ${styles.left}`}>
        {props.nextUrl ? (
          <Link to={props.nextUrl}>
            {props.showIcon ? (
              <FontAwesomeIcon icon={faAngleLeft} size="sm" />
            ) : (
              ''
            )}{' '}
            {props.nextName}
          </Link>
        ) : (
          <span>
            {props.showIcon ? (
              <FontAwesomeIcon icon={faAngleLeft} size="sm" />
            ) : (
              ''
            )}{' '}
            {props.nextName}
          </span>
        )}
      </div>
    ) : (
      <div />
    )}
    {props.previousName ? (
      <div className={`${styles.link} ${styles.right}`}>
        {props.previousUrl ? (
          <Link to={props.previousUrl}>
            {props.previousName}{' '}
            {props.showIcon ? (
              <FontAwesomeIcon icon={faAngleRight} size="sm" />
            ) : (
              ''
            )}
          </Link>
        ) : (
          <span>
            {props.previousName}{' '}
            {props.showIcon ? (
              <FontAwesomeIcon icon={faAngleRight} size="sm" />
            ) : (
              ''
            )}
          </span>
        )}
      </div>
    ) : (
      <div />
    )}
  </div>
)
