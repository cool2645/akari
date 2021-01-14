import * as React from 'react'

export interface ImgProps {
  alt: string
  src: string
}

export default (props: ImgProps) => (
  <figure>
    <img className="gatsby-resp-image-image" {...props} />
  </figure>
)
