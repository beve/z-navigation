import React, { useEffect, useState } from 'react'
// import SVGLoader from '../SVGLoader'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

const Shape = ({ path, position, color, opacity, index }) => {

  const meshes = []

  const { fill, fillOpacity, stroke, strokeOpacity } = path.userData.style;

  if (fill !== undefined && fill !== 'none') {
    const shapes = path.toShapes(true);
    meshes.push(shapes.map((shape, i) => (
      <mesh key={shape.uuid} position={[0,0,0.0001]}>
        <meshBasicMaterial attach="material" side={THREE.DoubleSide} color={fill} />
        <shapeBufferGeometry attach="geometry" args={[shape]} />
      </mesh>
    )))
  }

  if (stroke !== undefined && stroke !== 'none') {
    for (let j = 0, jl = path.subPaths.length; j < jl; j++) {
      let subPath = path.subPaths[j];
      const strokeGeometry = SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);
      meshes.push(
        <mesh key={strokeGeometry.uuid} geometry={strokeGeometry} position={[0,0,0]}>
          <meshBasicMaterial attach="material" side={THREE.DoubleSide} color={stroke} />
        </mesh>
      )
    }
  }

  return (
    <group position={[0,0,-index*0.01]}>
      {meshes}
    </group>
  )

}

const SVG = ({ src, position }) => {

  const [paths, set] = useState([])

  const svgResource = new Promise(resolve =>
    new SVGLoader().load(src, shapes =>
      resolve(shapes.paths)
    )
  )

  useEffect(() => void svgResource.then(set), [])

  return (
    <group scale={[0.01, 0.01, 0.001]} position={[position[0]-3, position[1]+3, position[2]]} rotation={[THREE.Math.degToRad(180), 0, 0]}>
      {paths.map((path, i) => <Shape key={i} index={i} path={path} />)}
    </group>
  )
}

export default SVG;