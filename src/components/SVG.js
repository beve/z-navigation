import React, { forwardRef, useEffect, useState } from 'react'
// import SVGLoader from '../SVGLoader'
import * as THREE from '../three-exports'
import { a } from '@react-spring/three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

const Shape = ({ path, position, color, opacity, index }) => {

  const meshes = []

  const { fill, fillOpacity, stroke, strokeOpacity } = path.userData.style;

  if (fill !== undefined && fill !== 'none') {
    const shapes = path.toShapes(true);
    meshes.push(shapes.map((shape, i) => (
      <mesh key={shape.uuid} position={[0, 0, 0.001]}>
        <a.meshBasicMaterial attach="material" side={THREE.DoubleSide} opacity={opacity} color={fill} />
        <shapeBufferGeometry attach="geometry" args={[shape]} />
      </mesh>
    )))
  }

  if (stroke !== undefined && stroke !== 'none') {
    for (let j = 0, jl = path.subPaths.length; j < jl; j++) {
      let subPath = path.subPaths[j];
      const strokeGeometry = SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);
      meshes.push(
        <mesh key={strokeGeometry.uuid} geometry={strokeGeometry} position={[0, 0, 0.001]}>
          <a.meshBasicMaterial attach="material" side={THREE.DoubleSide} opacity={opacity} color={stroke} />
        </mesh>
      )
    }
  }

  return (
    <group>
      {meshes}
    </group>
  )

}

const SVG = forwardRef(({ src, position, opacity }, ref) => {

  const [paths, set] = useState([])

  useEffect(() => {
    const svgResource = new Promise(resolve =>
      new SVGLoader().load(src, shapes =>
        resolve(shapes.paths)
      )
    )
    let process = true;
    svgResource.then(res => {
      if (process) {
        set(res)
      }
    })
    return () => {
      process = false;
    }
  }, [src])

  return (
    <group ref={ref} scale={[0.01, 0.01, 1]} position={position} rotation={[THREE.Math.degToRad(180), 0, 0]}>
      {paths.map((path, i) => <Shape opacity={opacity} key={i} index={i} path={path} />)}
    </group>
  )
})

export default SVG;