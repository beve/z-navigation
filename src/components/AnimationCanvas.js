import React, { useCallback, useRef, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import Scene from './Scene'
import AnimationContext from './AnimationContext'
import Controls from './Controls'

const AnimationCanvas = () => {

  const mouse = useRef([0, 0])
  const zoomPos = useRef(0)
  const [canvasColor, setCanvasColor] = useState('blue')

  const onMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])

  const onWheel = useCallback((e) => (zoomPos.current = (e.deltaY > 0) ? zoomPos.current + 20 : zoomPos.current - 20), [])

  const onPointerMissed = () => {
  }

  return (

    <Canvas
      style={{ backgroundColor: canvasColor }}
      // shadowMap
      camera={{ near: 1, far: 20, position: [0, 0, 8] }}
      onWheel={onWheel}
      // onTouchMove={onMove}
      onMouseMove={onMove}
      onPointerMissed={onPointerMissed}>
      <AnimationContext>
        <Scene mouse={mouse} zoomPos={zoomPos} />
        <Controls />
      </AnimationContext>
    </Canvas >
  )
}

export default AnimationCanvas