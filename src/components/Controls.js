import React, { useContext, useEffect, useRef } from 'react'
import { DispatchContext, StateContext } from './AnimationContext'
import { useFrame } from 'react-three-fiber'
import * as THREE from '../three-exports'

const Controls = ({ mouse, zoomPos, clickOutside }) => {

  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)
  const lastZoomValue = useRef(state.maxZ)

  // Handle click outside a card
  // useFrame(() => {
  //   if (clickOutside.current === true) {
  //     clickOutside.current = false;
  //     if (state.card) {
  //       dispatch({ type: 'select', value: null })
  //     }
  //   }
  // })

  const temp = new THREE.Vector3
  const origin = new THREE.Vector3

  useFrame(({ camera }) => {
    if (state.card) {
      if (temp.distanceTo(camera.position) > 0.1) {
        origin.set(state.card.current.matrixWorld);
        temp.setFromMatrixPosition(state.card.current.matrixWorld);
        temp.z += 4;
        camera.position.lerp(temp, 0.2);
      } else {
        if (clickOutside.current && (origin.distanceTo(camera.position) > 0.01)) {
          camera.position.lerp(origin, 0.2);
        } else {
          clickOutside.current = false;
        }
      }
    }
  })

  return (
    <>
    </>
  )
}

export default Controls