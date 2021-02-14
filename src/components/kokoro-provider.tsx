import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'kokoro-provider': any
    }
  }
}

export default (props: any) => {
  return (
    <kokoro-provider>
      {props.children}
    </kokoro-provider>
  )
}
