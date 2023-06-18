'use client'

import { useRef } from 'react'
import Container from '@/components/layout/Container'

export default function Page () {
  const pressStart = useRef<number>(0)

  const long = () => {
    console.log('long')
  }

  const short = () => {
    console.log('short')
  }

  const onDown = () => {
    console.log('down')
    pressStart.current = Date.now()
  }

  const onUp = () => {
    console.log('up')
    if (Date.now() - pressStart.current > 500) {
      long()
    } else {
      short()
    }
  }

  return <Container>
    <div className="py-8">
      <h1>Press State</h1>
      <button onMouseDown={onDown} onMouseUp={onUp} onTouchStart={onDown} onTouchEnd={onUp}>Press</button>
    </div>
  </Container>
}