import React from 'react'
import { a } from '@react-spring/three'

const Background = ({ color }) => {

  return (
    <mesh scale={[200, 200, 1]} position={[0,0,-10]} fog={false}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <a.meshBasicMaterial attach="material" color={color} depthTest={false} fog={false} />
    </mesh>
  )
}

export default Background