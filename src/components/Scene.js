import React from 'react'
import Card from './Card'
import Text from './Text'
import items from '../items'

function Scene() {

  const components = items.map(({ type, props }) => {
    switch (type) {
      case 'text':
        return <Text key={props.position} {...props} />
      default:
        return <Card key={props.position} {...props} />
    }
  })

  return (
    <>
      <ambientLight />
      <fog attach="fog" args={['#5AA8CC', 10, 15]} />
      {[components]}
    </>
  )
}

export default Scene