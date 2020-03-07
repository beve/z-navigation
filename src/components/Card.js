import React, { useContext, useEffect, useRef, useMemo, useState, Suspense } from 'react'
import { useSpring, config } from '@react-spring/core'
import { a } from '@react-spring/three'
import * as THREE from '../three-exports'
import Text from './Text'
import SVG from './SVG'
import usePromise from "react-promise-suspense"
import Effects from './Effects'
import { DispatchContext } from './AnimationContext'
import { useLocalStorage } from 'react-use';

const Card = ({ id, position, video, image, label, url, y, maskColor }) => {

  const dispatch = useContext(DispatchContext)

  const meshRef = useRef()
  const material = useRef()
  const imgTexture = useMemo(() => (image) ? new THREE.TextureLoader().load(image) : null, [image])
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(id, false);

  const Video = ({ src }) => {
    const v = usePromise(src => new Promise((resolve, reject) => {
      const vid = document.createElement('video');
      vid.src = src;
      vid.playsInline = true;
      vid.loop = true;
      vid.preload = true;
      vid.muted = true;
      vid.controls = false;
      vid.crossOrigin = 'anonymous';
      vid.style.display = 'none';
      vid.oncanplay = () => {
        vid.play();
        setTimeout(() => resolve(vid), 2000);
      };
      vid.onerror = reject;
    }), [src]);
    return <primitive attach="map" object={new THREE.VideoTexture(v)} />
  }

  const Loading = () => (
    <a.mesh ref={meshRef} position={position} onPointerOver={onHover} onPointerOut={onOut} onClick={onClick} scale={scale}>
      <planeBufferGeometry attach="geometry" args={[4, 2.8]} />
      <meshBasicMaterial transparent attach="material" color={'red'} />
    </a.mesh>
  )

  // const hovered = useRef(false)
  const [hovered, setHovered] = useState(false)
  const clicked = useRef(false)

  const { color, opacity, scale } = useSpring({ color: hovered ? '#fff' : maskColor, opacity: hovered ? 1 : 0.7, scale: hovered ? [1.2, 1.2, 1] : [1, 1, 1] })

  const onHover = (e) => {
    e.stopPropagation()
    setHovered(true)
    dispatch({ type: 'setCursor', value: 'eye' })
  }

  const onOut = () => {
    setHovered(false)
    dispatch({ type: 'setCursor', value: 'pointer' })
    // if (!clicked.current) {
    //   mesh.current.material.color = new THREE.Color('#5796B3')
    //   dispatch({ type: 'zoomEnabled', value: true })
    // }
  }

  const onClick = (e) => {
    e.stopPropagation();
    clicked.current = !clicked.current;
    // if (video) {
    //   if (clicked.current) {
    //     vid.play();
    //   } else {
    //     vid.pause()
    //   }
    // }
    if (clicked.current) {
      meshRef.current.userData = { display: true }
      // dispatch({ type: 'setCameraMatrixWorld', value: camera.matrixWorld})
      // dispatch({ type: 'select', value: (clicked.current) ? meshRef : null })
    } else {
      // dispatch({ type: 'unselect', value: true })
    }
  }

  return (
    <a.group position={position} scale={scale}>
      <Suspense fallback={<Loading />}>
        <mesh ref={meshRef} onPointerOver={onHover} onPointerOut={onOut} onClick={onClick}>
          <planeBufferGeometry attach="geometry" args={[4, 2.8]} />
          <a.meshLambertMaterial opacity={opacity} transparent attach="material" ref={material} color={color}>
            {video && <Video src={video} />}
            {imgTexture && <primitive attach="map" object={imgTexture} />}
          </a.meshLambertMaterial>
          {label && <Text color="#333" size={0.1} position={[0, -0.9, 0]}>{label}</Text>}
        </mesh>
        <SVG src="/assets/eye.svg" position={[1.5,1.2,0.1]} scale={scale} />
      </Suspense>
    </a.group>
  )
}

export default Card;