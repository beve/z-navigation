import React, { useRef, useEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import * as THREE from '../three-exports'
import Scene from './Scene'
import AnimationContext from './AnimationContext'
import Cursor from './Cursor'
import Controls from './Controls'
import { disableBodyScroll } from 'body-scroll-lock';


const AnimationCanvas = () => {

  const clickOutside = useRef(false)

  const onPointerMissed = () => {
    clickOutside.current = true;
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  useEffect(() => {
    disableBodyScroll()
  }, []);

  return (

    <Canvas
      // pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
      pixelRatio={typeof window !== 'undefined' ? window.pixelRatio : 1}
      camera={{ near: 2, far: 30, position: [0, 0, 5], fov: isMobile ? 110 : 90 }}
      scale={[0.5, 0.5, 0.5]}
      // onWheel={onWheel}
      // onTouchMove={onMove}
      // onMouseMove={onMove}
      onPointerMissed={onPointerMissed}
      vr
      updateDefaultCamera
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping
        // gl.setClearColor(new THREE.Color('#020207'))
        // gl.toneMapping = THREE.ACESFilmicToneMapping
        // gl.outputEncoding = THREE.sRGBEncoding
      }}>
      <AnimationContext cursor={<Cursor />} controls={<Controls clickOutside={clickOutside} />}>
        <Scene isMobile={isMobile} clickOutside={clickOutside} />
      </AnimationContext>
    </Canvas>
  )
}

export default AnimationCanvas