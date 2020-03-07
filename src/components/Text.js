import * as THREE from '../three-exports'
import React, { useState, useMemo } from 'react'
import fontFile from '../victormono'

export default function Text({ children, size = 1, letterSpacing = 0.01, color = '#000000', centerX = true, centerY = true, ...props }) {
  const [font] = useState(() => new THREE.FontLoader().parse(fontFile))
  const [shapes, [x, y]] = useMemo(() => {
    let x = 0,
      y = 0
    let letters = [...String(children)]
    let mat = new THREE.MeshBasicMaterial({ color, opacity: 1, transparent: true })
    let matT = new THREE.MeshBasicMaterial({ color, opacity: 0, transparent: true })
    return [
      letters.map(letter => {
        const geom = new THREE.ShapeGeometry(font.generateShapes(letter === ' ' ? '_' : letter, size, 1))
        geom.computeBoundingBox()
        const mesh = new THREE.Mesh(geom, letter === ' ' ? matT : mat)
        mesh.position.x = x
        x += geom.boundingBox.max.x + letterSpacing
        y = Math.max(y, geom.boundingBox.max.y)
        return mesh
      }),
      [x, y]
    ]
  }, [font, children, size, letterSpacing, color])
  return (
    <group {...props}>
      <group position={[centerX ? -x / 2 : 0, centerY ? -y / 2 : 0, 0]}>
        {shapes.map((shape, index) => (
          <primitive key={index} object={shape} />
        ))}
      </group>
    </group>
  )
}
