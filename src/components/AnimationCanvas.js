import React, { useCallback, useRef, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import Scene from './Scene'
import AnimationContext from './AnimationContext'
import Controls from './Controls'

const AnimationCanvas = () => {

  const mouse = useRef([0, 0])
  const zoomPos = useRef(0)
  const clickOutside = useRef(false)

  const onMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])

  const onWheel = useCallback((e) => (zoomPos.current = (e.deltaY > 0) ? zoomPos.current + 20 : zoomPos.current - 20), [])

  const onPointerMissed = () => {
    clickOutside.current = true;
  }

  return (

    <Canvas
      style={{ backgroundColor: '#5AA8CC' }}
      shadowMap
      camera={{ near: 1, far: 20, position: [0, 0, 5] }}
      onWheel={onWheel}
      onTouchMove={onMove}
      onMouseMove={onMove}
      onPointerMissed={onPointerMissed}>
      <AnimationContext controls={<Controls clickOutside={clickOutside} mouse={mouse} zoomPos={zoomPos} />}>
        <Scene />
      </AnimationContext>
    </Canvas >
  )
}

export default AnimationCanvas