import React, { forwardRef, useEffect, useState } from 'react'
import { usePublicSquare } from '../core/PublicSquareProvider'
import {
  CreateElementOptions,
  ElementType
} from '@publicsquare/elements-js/types/sdk'

type ElementProps = {
  id: string
  type: ElementType
  options?: CreateElementOptions
}

const PublicSquareElement = forwardRef<any, ElementProps>(function Component(
  { id, type, options = {} },
  ref
) {
  const [elementId, setElementId] = useState(id)
  const { publicsquare, createElement } = usePublicSquare()
  const [element, setElement] = useState()

  function setRef(element: ReturnType<typeof createElement>) {
    if (typeof ref === 'function') {
      ref(element)
    } else if (ref) {
      ref.current = element
    }
  }

  let init = false
  useEffect(() => {
    if (!init && publicsquare && !element) {
      init = true
      const element = createElement(type, options)
      element.mount(`#${id}`)
      setRef(element)
    }
  }, [publicsquare, element])

  if (!id || !type || !ref) {
    console.error(`PublicSquare element requires an id, type, & ref!`)
    return null
  } else {
    return <div id={elementId} />
  }
})

export default PublicSquareElement
