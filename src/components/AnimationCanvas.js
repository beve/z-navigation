import React, { useCallback, useRef } from 'react'
import { Canvas } from 'react-three-fiber'
import Scene from './Scene'
import AnimationContext from './AnimationContext'
import Controls from './Controls'

const AnimationCanvas = () => {

  const mouse = useRef([0, 0])
  const zoomPos = useRef(0)
  const clickOutside = useRef(false)

  const onMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])

  const onWheel = useCallback((e) => (zoomPos.current = (e.deltaY > 0) ? zoomPos.current + 1 : zoomPos.current - 1), [])

  const onPointerMissed = () => {
    clickOutside.current = true;
  }

  return (

    <Canvas
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