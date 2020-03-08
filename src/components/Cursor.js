import React, { useRef, useState, useContext, useMemo, useCallback } from 'react'
import SVG from './SVG'
import { useFrame, useThree } from 'react-three-fiber'
import { useTransition } from '@react-spring/three'
// import { StateContext } from './AnimationContext'

const Cursor = ({ cursor }) => {

  const svgRef = useRef()

  // const state = useContext(StateContext)

  const icons = {
    'eye': useCallback(({ style }) => <SVG style={{ ...style }} ref={svgRef} key={'/assets/eye.svg'} src={'/assets/eye.svg'} opacity={1} />, []),
    'pointer': useCallback(({ style }) => <SVG style={{ ...style }} ref={svgRef} key={'/assets/cursor.svg'} src={'/assets/cursor.svg'} opacity={1} />, []),
    'close': useCallback(({ style }) => <SVG style={{ ...style }} ref={svgRef} key={'/assets/exit.svg'} src={'/assets/exit.svg'} opacity={1} />, []),
  }

  const transitions = useTransition(icons[cursor], item => item, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  useFrame(({ mouse, viewport }) => {
    if (svgRef.current) {
      svgRef.current.position.x = (mouse.x * viewport.width / 2)
      svgRef.current.position.y = (mouse.y * viewport.height / 2)
    }
  })

  return transitions.map(({ item, key, props }) => {
    const Svg = item
    return <Svg style={props} key={key} />
  })

}

export default Cursor