import * as React from 'react'
const { Fragment } = React

export default ({ text, tagBuilder }: { text: string, tagBuilder: (str: string) => string }) => {
  function preventDefault (e: React.MouseEvent) {
    e.preventDefault()
  }

  function ellipsis (str: string) {
    if (str.length > 15) return str.substr(0, 15) + '...'
    return str
  }

  const lines = text.split('\n')
  return (
    <>
      {
        lines.map(
          (line, key) => {
            const words = (line.match(/\S+/g) || [])
            return (
              <Fragment key={key}>
                {
                  words.map(
                    (word, key2) => {
                      if (word.startsWith('#')) {
                        return (<Fragment key={key2}>
                          <a href={tagBuilder(word.substr(1))} onClick={preventDefault}>{word}</a>
                          {key2 !== words.length - 1 ? ' ' : ''}
                        </Fragment>)
                      }
                      const match = word.match(/https?:\/\/\S+$/)
                      if (match) {
                        return (
                          <Fragment key={key2}>
                            {word.replace(/https?:\/\/\S+$/, '')}
                            <a key={word} href={match[0]} target="_blank" rel="nofollow noopener noreferrer">
                              {ellipsis(match[0])}
                            </a>
                            {key2 !== words.length - 1 ? ' ' : ''}
                          </Fragment>
                        )
                      }
                      return <Fragment key={key2}>{word}{key2 !== words.length - 1 ? ' ' : ''}</Fragment>
                    }
                  )
                }
                {key !== lines.length - 1 ? <br /> : ''}
              </Fragment>
            )
          }
        )
      }
    </>
  )
}
