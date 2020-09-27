import * as React from 'react'

export interface ImgProps {
  alt: string
}

export default (props: ImgProps) => (
  <figure>
    <img {...props} />
  </figure>
)
