import React, { useRef, useState, useMemo } from 'react'
import { useThree, useFrame, Dom } from 'react-three-fiber'
import lerp from 'lerp'
import * as THREE from 'three'
import Text from './Text'

const Card = ({ position, video, image, label, urlG }) => {

  const mesh = useRef()
  const material = useRef()

  const { camera } = useThree()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [displayed, setDisplayed] = useState(false)

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

  // useEffect(() => {
  //   if (videoRef.current) {
  //     vidTexture.current = new THREE.VideoTexture(videoRef.current)
  //     videoRef.current.play()
  //   }
  // }, [])

  useFrame(() => {
    mesh.current.material.opacity = lerp(mesh.current.material.opacity, hovered ? 1 : 0.7, 0.1)
    if (clicked && !displayed) {
      const currentX = Math.abs(camera.position.x - mesh.current.position.x);
      const currentY = Math.abs(camera.position.y - mesh.current.position.y);
      const currentZ = Math.abs(camera.position.z - mesh.current.position.z);
      if (currentX >= 0.1 || currentY >= 0.1 || currentZ >= 1.7) {
        camera.position.x = lerp(camera.position.x, mesh.current.position.x, 0.2);
        camera.position.y = lerp(camera.position.y, mesh.current.position.y, 0.2);
        camera.position.z = lerp(camera.position.z, mesh.current.position.z, 0.07)
      } else {
        setDisplayed(true)
        setClicked(false)
      }
    } else if (clicked && displayed) {
      if (Math.abs(camera.position.x) >= 0.01 || Math.abs(camera.position.y) >= 0.01) {
        camera.position.x = lerp(camera.position.x, 0, 0.1);
        camera.position.y = lerp(camera.position.y, 0, 0.1);
        camera.position.z = lerp(camera.position.z, 0, 0.1)
      } else {
        setDisplayed(false)
        setClicked(false)
      }
    }
  })

  const onHover = () => {
    setHovered(true)
    // mesh.current.material.transparent = false
  }

  const onOut = () => {
    // mesh.current.material.opacity = lerp(mesh.current.material.opacity, 0.7, 0.1)
    setHovered(false)
    // mesh.current.material.transparent = true
  }

  const onClick = (e) => {
    e.stopPropagation();
    setClicked(!clicked)
    setDisplayed(!(!displayed && !clicked))
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