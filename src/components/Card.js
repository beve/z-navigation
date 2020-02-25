import React, { useContext, useRef, useState, useMemo } from 'react'
import { useThree, useFrame } from 'react-three-fiber'
import lerp from 'lerp'
import * as THREE from 'three'
import Text from './Text'
import { DispatchContext } from './AnimationContext'

const Card = ({ position, video, image, label, url }) => {

  const mesh = useRef()
  const material = useRef()

  console.log('RENDER CARD')



  // const [hovered, setHovered] = useState(false)
  // const [clicked, setClicked] = useState(false)
  // const [displayed, setDisplayed] = useState(false)

  const hovered = useRef(false)

  const clicked = useRef(false)

  const dispatch = useContext(DispatchContext)

  // const videoUrl = (video) ? `/assets/${video}.mp4` : null

  // const videoRef = useRef()
  const vidTexture = useRef()
  const imgTexture = useMemo(() => (image) ? new THREE.TextureLoader().load(image) : null, [image])
  // const vidTexture = useMemo(() => { return (!videoRef.current) ? null : new THREE.VideoTexture(videoRef.current), [videoRef.current]} )

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
  }

  const onOut = () => {
    hovered.current = false;
  }

  const onClick = (e) => {
    e.stopPropagation();
    // setClicked(!clicked)
    clicked.current = !clicked.current;
    dispatch({ type: 'select', value: (clicked.current) ? mesh : null })
    // // setDisplayed(!(!displayed && !clicked))
  }


  return (
    <>
      <mesh ref={mesh} position={position} onPointerOver={onHover} onPointerOut={onOut} onClick={onClick}>

        {/* {false && video && (
          <Dom style={{display: 'none'}}>
            <video crossOrigin="anonymous" playsInline ref={videoRef} loop preload="true" controls={false} >
              <source src={videoUrl} type="video/mp4"/>
            </video>
          </Dom>
        )} */}
        <planeBufferGeometry attach="geometry" args={[2, 1.4]} />
        <meshLambertMaterial opacity={0.7} transparent attach="material" ref={material}>
          {vidTexture.current && <primitive attach="map" object={vidTexture.current} />}
          {/* {videoRef.current && <vidTexture args={[videoRef.current]} attach="map" />} */}
          {imgTexture && <primitive attach="map" object={imgTexture} />}
        </meshLambertMaterial>
        {label && <Text color="#333" size={0.1} position={[0, -0.9, 0]}>{label}</Text>}
      </mesh>
    </>
  )
}

export default Card;