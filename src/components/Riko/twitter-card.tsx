import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

import Card from './card'

interface TwitterCardProps {
  time: string
  full_text: string
  url: string
  extended_entities?: any
  source: string
  retweeted_status?: any
  childFile?: {
    childImageSharp: {
      fluid: any
    }
  }
}

export default (props: TwitterCardProps) => {
  const source = props.source.replace(/<[^>]+>/ig, '')
  let fullText = props.full_text.replace(/https:\/\/t.co\/[^\/]+$/, '')
  if (props.retweeted_status) {
    fullText = fullText.replace(/^RT @[a-zA-Z0-9_]+:/, '')
  }
  return (
    <Card
      time={props.time}
      via={`!Twitter${source}`}
      href={props.url}
      cover_fluid={props.childFile ? props.childFile.childImageSharp.fluid : null}
    >
      {
        props.retweeted_status ?
          <>
            <a href={`https://twitter.com/${props.retweeted_status.user.screen_name}`}>
              <FontAwesomeIcon icon={faRetweet} /> {props.retweeted_status.user.name}</a>
          </> : ''
      } {fullText}
    </Card>
  )
}
