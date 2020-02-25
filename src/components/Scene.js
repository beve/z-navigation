import React from 'react'
import { useFrame } from 'react-three-fiber'
import lerp from 'lerp'
import Card from './Card'
import Text from './Text'

function Scene({ mouse, zoomPos }) {

  useFrame(({ camera }) => {
    // camera.position.x = mouse.current[0] * 0.001
    // camera.position.y = mouse.current[1] * 0.001

    const x = (1 - mouse.current[0]) * 0.0005;
    const y = (1 - mouse.current[1]) * 0.0005;

    camera.rotation.x += 0.05 * (y - camera.rotation.x);
    camera.rotation.y += 0.05 * (x - camera.rotation.y);
    camera.position.z = lerp(camera.position.z, camera.position.z + zoomPos.current, 0.001)
  })

  const items = [{
    type: 'text',
    props: {
      color: "gray",
      size: 1,
      letterSpacing: 0.2,
      position: [0, 0, 0],
      children: 'Projet #1'
    }
  },
  {
    type: 'card',
    props: {
      position: [-2, -2, -5],
      video: 'video1',
      label: 'Virtual reality'
    }
  },
  {
    type: 'card',
    props: {
      position: [-1.5, 2, -6],
      image: '/assets/image1.jpg',
    }
  },
  {
    type: 'card',
    props: {
      position: [3, 1.5, -7],
      video: 'video1',
      label: 'Virtual reality'
    }
  },
  {
    type: 'card',
    props: {
      position: [3, -2.5, -8],
      image: '/assets/image1.jpg',
    }
  },

  ]

  return (
    <>
      {items.map(item=> {
        return (item.type === 'text') ?
          <Text key={item.props.position} {...item.props} />
          :
          <Card key={item.props.position} {...item.props} />
      })}
    </>
  )
}

export default Scene