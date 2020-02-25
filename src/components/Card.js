import React, { useContext, useRef, useMemo } from 'react'
import { useFrame } from 'react-three-fiber'
import lerp from 'lerp'
import * as THREE from 'three'
import Text from './Text'
import { DispatchContext } from './AnimationContext'

const Card = ({ position, video, image, label, url }) => {

  const dispatch = useContext(DispatchContext)

  const mesh = useRef()
  const material = useRef()
  const vidTexture = useRef()
  const imgTexture = useMemo(() => (image) ? new THREE.TextureLoader().load(image) : null, [image])

  const hovered = useRef(false)
  const clicked = useRef(false)

  if (video) {
    const vid = document.getElementById(video);
    vidTexture.current = new THREE.VideoTexture(vid)
    vid.play();
  }

  useFrame(() => {
    mesh.current.material.opacity = lerp(mesh.current.material.opacity, hovered.current ? 1 : 0.7, 0.1)
  })

  const onHover = () => {
    hovered.current = true;
    mesh.current.material.color = new THREE.Color('white')
  }

  const onOut = () => {
    hovered.current = false;
    if (!clicked.current) {
      mesh.current.material.color = new THREE.Color('blue')
    }
  }

  const onClick = (e) => {
    mesh.current.material.color = new THREE.Color('white')
    e.stopPropagation();
    clicked.current = !clicked.current;
    dispatch({ type: 'select', value: (clicked.current) ? mesh : null })
  }


  return (
    <>
      <mesh ref={mesh} position={position} onPointerOver={onHover} onPointerOut={onOut} onClick={onClick}>
        <planeBufferGeometry attach="geometry" args={[2, 1.4]} />
        <meshLambertMaterial opacity={0.7} transparent attach="material" ref={material} color={"blue"}>
          {vidTexture.current && <primitive attach="map" object={vidTexture.current} />}
          {imgTexture && <primitive attach="map" object={imgTexture} />}
        </meshLambertMaterial>
        {label && <Text color="#333" size={0.1} position={[0, -0.9, 0]}>{label}</Text>}
      </mesh>
    </>
  )
}

export default Card;