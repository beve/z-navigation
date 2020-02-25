import React, { useContext, useState } from 'react'
import { DispatchContext, StateContext } from './AnimationContext'
import { useFrame } from 'react-three-fiber'
import { useEffect } from 'react'
import lerp from 'lerp'

const Controls = ({ clickOutside }) => {

  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  useFrame((p) => {
    if (clickOutside.current === true) {
      clickOutside.current = false;
      dispatch({ type: 'select', value: null })
    }
  })

  useFrame(({ camera }) => {
    if (state.card) {
      const currentX = Math.abs(camera.position.x - state.card.current.position.x);
      const currentY = Math.abs(camera.position.y - state.card.current.position.y);
      const currentZ = Math.abs(camera.position.z - state.card.current.position.z);
      if (currentX >= 1 || currentY >= 1 || currentZ >= 1.7) {
        camera.position.x = lerp(camera.position.x, state.card.current.position.x, 0.2);
        camera.position.y = lerp(camera.position.y, state.card.current.position.y, 0.2);
        camera.position.z = lerp(camera.position.z, state.card.current.position.z, 0.07)
      }
    } else {
      if (Math.abs(camera.position.x) >= 0.01 || Math.abs(camera.position.y) >= 0.01) {
        camera.position.x = lerp(camera.position.x, 0, 0.1);
        camera.position.y = lerp(camera.position.y, 0, 0.1);
        camera.position.z = lerp(camera.position.z, 0, 0.1)
      }
    }
  })

  return (
    <>
    </>
  )
}

export default Controls