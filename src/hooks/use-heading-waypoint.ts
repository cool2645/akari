import { navigate } from 'gatsby'
import { useEffect, useRef, useState } from 'react'

export function useHeadingWaypoint (maxDepth: number = 6) {
  const [currentHeadingIndex, _setCurrentHeadingIndex] = useState(0)
  const articleRef = useRef<HTMLDivElement>(null)
  let headingEls: NodeListOf<HTMLHeadingElement>

  maxDepth = Math.min(6, maxDepth)
  const headingSelectors: string[] = []
  for (let i = 1; i <= maxDepth; i++) {
    headingSelectors.push(`h${i}`)
  }

  function setCurrentHeadingIndex (index: number) {
    if (!articleRef.current) return
    const articleEl = articleRef.current
    if (!headingEls) {
      headingEls = articleEl.querySelectorAll(headingSelectors.join(', '))
    }
    const el = headingEls.item(index)
    window.scrollTo(0, el.offsetTop - 20 + articleEl.offsetTop)
    navigate(`#${el.innerText}`, { replace: true })?.catch()
    _setCurrentHeadingIndex(index)
  }

  useEffect(() => {
    function checkCurrentFocusHeading () {
      setTimeout(() => {
        if (!articleRef.current) return
        const articleEl = articleRef.current
        if (!headingEls) {
          headingEls = articleEl.querySelectorAll(headingSelectors.join(', '))
        }
        let topElIndex = 0
        for (let i = 0; i < headingEls.length; i++) {
          const ele = headingEls.item(i)
          if (ele.offsetTop - 25 <= window.scrollY - articleEl.offsetTop) {
            topElIndex = i
          } else {
            break
          }
        }
        if (topElIndex !== currentHeadingIndex) {
          navigate(`#${headingEls.item(topElIndex).innerText}`, { replace: true })?.catch()
          _setCurrentHeadingIndex(topElIndex)
        }
      })
    }
    if (articleRef.current) {
      const articleEl = articleRef.current
      if (!headingEls) {
        headingEls = articleEl.querySelectorAll(headingSelectors.join(', '))
      }
      for (let i = 0; i < headingEls.length; i++) {
        const ele = headingEls.item(i)
        if ('#' + encodeURIComponent(ele.innerText) === location.hash) {
          window.scrollTo(0, ele.offsetTop - 20 + articleEl.offsetTop)
          _setCurrentHeadingIndex(i)
          break
        }
      }
    }
    document.addEventListener('scroll', checkCurrentFocusHeading)
    return () => {
      document.removeEventListener('scroll', checkCurrentFocusHeading)
    }
  }, [])

  return {
    articleRef,
    currentHeadingIndex,
    setCurrentHeadingIndex
  }
}
