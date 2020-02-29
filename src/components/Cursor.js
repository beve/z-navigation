import React, { useRef } from 'react'
import SVG from './SVG'
import lerp from 'lerp'
import * as THREE from 'three'
import { useFrame, useThree } from 'react-three-fiber'

const Cursor = () => {

  const svgRef = useRef()
  const vect = new THREE.Vector3()
  const { viewport } = useThree()

  useFrame(({ mouse, camera, viewport }) => {
    // svgRef.current.position.x = lerp(svgRef.current.position.x, mouse.x, 1)
    // svgRef.current.position.y = lerp(svgRef.current.position.y, mouse.y, 1)
    // svgRef.current.position.x = mouse.x
    // svgRef.current.position.y = mouse.y
    // const val = -camera.position.z+1;
    vect.set(mouse.x, mouse.y, camera.position.z-1)
    vect.unproject(camera)
    // svgRef.current.position.set(vect);
    svgRef.current.position.x = vect.x * viewport.width;
    svgRef.current.position.y = vect.y;
  })


  return (
    <SVG ref={svgRef} src="/assets/cursor.svg" position={[0, 0, 0]} />
  )

}

export default Cursor