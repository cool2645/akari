import { useEffect } from 'react'

export function useMathJax () {
  useEffect(() => {
    if (top.MathJax) {
      top.MathJax.Hub.Queue(['Typeset', top.MathJax.Hub])
    }
  })
}
