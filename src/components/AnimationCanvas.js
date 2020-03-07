import React, { useRef } from 'react'
import { Canvas } from 'react-three-fiber'
import * as THREE from '../three-exports'
import Scene from './Scene'
import AnimationContext from './AnimationContext'
import Cursor from './Cursor'
import Controls from './Controls'

const AnimationCanvas = () => {

  const clickOutside = useRef(false)

  const onPointerMissed = () => {
    clickOutside.current = true;
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  return (

    <Canvas
      pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
      camera={{ near: 2, far: 30, position: [0, 0, 5], fov: isMobile ? 120 : 90 }}
      scale={[0.5,0.5,0.5]}
      // onWheel={onWheel}
      // onTouchMove={onMove}
      // onMouseMove={onMove}
      onPointerMissed={onPointerMissed}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping
        // gl.setClearColor(new THREE.Color('#020207'))
      }}>
      <AnimationContext cursor={<Cursor />} controls={<Controls clickOutside={clickOutside} />}>
        <Scene />
      </AnimationContext>
    </Canvas>
  )
}

export default AnimationCanvas