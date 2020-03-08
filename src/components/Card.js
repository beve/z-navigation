import React, { useContext, useEffect, useRef, useMemo, useState, Suspense } from 'react'
import { useSpring, config } from '@react-spring/core'
import { a } from '@react-spring/three'
import * as THREE from '../three-exports'
import Text from './Text'
import SVG from './SVG'
import usePromise from "react-promise-suspense"
import Effects from './Effects'
// import { DispatchContext } from './AnimationContext'
import { useLocalStorage } from 'react-use';

const Card = ({ id, position, video, image, label, url, maskColor, iconColor, onClick, clickOutside, onPointerOut, onPointerOver }) => {

  // const dispatch = useContext(DispatchContext)

  const groupRef = useRef()
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
        setTimeout(() => resolve(vid), 0);
      };
      vid.onerror = reject;
    }), [src]);
    return <primitive attach="map" object={new THREE.VideoTexture(v)} />
  }

  const Loading = () => (
    <a.mesh scale={scale}>
      <planeBufferGeometry attach="geometry" args={[4, 2.8]} />
      <meshBasicMaterial opacity={0.7} transparent attach="material" color={maskColor} />
    </a.mesh>
  )

  // const hovered = useRef(false)
  const [hovered, setHovered] = useState(false)
  const clicked = useRef(false)

  const { color, opacity, scale } = useSpring({ color: hovered ? '#fff' : maskColor, opacity: hovered ? 1 : 0.7, scale: hovered ? [1.2, 1.2, 1] : [1, 1, 1] })

  const onHoverHandle = (e) => {
    e.stopPropagation()
    onPointerOver(groupRef.current)
    setHovered(true)
    // dispatch({ type: 'setCursor', value: 'eye' })
  }

  const onOutHandle = (e) => {
    setHovered(false)
    onPointerOut(groupRef.current)
  }

  const onClickHandle = (e) => {
    e.stopPropagation();
    onClick(groupRef.current);
    // clicked.current = !clicked.current;
    // if (video) {
    //   if (clicked.current) {
    //     vid.play();
    //   } else {
    //     vid.pause()
    //   }
    // }
  }

  return (
    <a.group position={position} scale={scale} ref={groupRef}>
      <Suspense fallback={<Loading />}>
        <mesh onPointerOver={onHoverHandle} onPointerOut={onOutHandle} onClick={onClickHandle}>
          <planeBufferGeometry attach="geometry" args={[4, 2.8]} />
          <a.meshLambertMaterial opacity={opacity} transparent attach="material" ref={material} color={color}>
            {video && <Video src={video} />}
            {imgTexture && <primitive attach="map" object={imgTexture} />}
          </a.meshLambertMaterial>
          {label && <Text color="#333" size={0.1} position={[0, -0.9, 0]}>{label}</Text>}
        </mesh>
        <SVG src="/assets/check.svg" position={[1.3, 1.2, 0.1]} scale={scale} color={iconColor} />
      </Suspense>
    </a.group>
  )
}

export default Card;