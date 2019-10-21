import * as React from 'react'

import Highlight from '../highlight'

import Card from './card'

interface EssayCardProps {
  time: string
  content: string
  category: string
  url: string
  childFile?: {
    childImageSharp: {
      fluid: any
    }
  }
}

export default (props: EssayCardProps) => {
  function fold (text: string, limit: number) {
    const linesAndWords = text.split('\n').map(
      (line) => line.split(' ')
    )
    let sum = 0
    const ex = []
    for (const line of linesAndWords) {
      const exLine = []
      for (const word of line) {
        exLine.push(word)
        sum += word.length
        if (sum > limit) break
      }
      ex.push(exLine)
      if (sum > limit) break
    }
    return ex.map((line) => line.join(' ')).join('\n')
  }
  const excerpt = fold(props.content, 300)
  return (
    <Card
      time={props.time}
      via={props.category}
      href={props.url}
      cover_fluid={props.childFile ? props.childFile.childImageSharp.fluid : null}
    >
      <Highlight text={excerpt} />
      {excerpt !== props.content ? '...' : ''}
    </Card>
  )
}
