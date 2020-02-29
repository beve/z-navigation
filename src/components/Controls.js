import React, { useContext, useRef } from 'react'
import { DispatchContext, StateContext } from './AnimationContext'
import { useFrame } from 'react-three-fiber'
import { useEffect } from 'react'
import lerp from 'lerp'

const Controls = ({ mouse, zoomPos, clickOutside }) => {

  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)
  const lastZoomValue = useRef(state.maxZ)

  // Handle click outside a card
  useFrame(() => {
    if (clickOutside.current === true) {
      clickOutside.current = false;
      if (state.card) {
        dispatch({ type: 'select', value: null })
      }
      // Stop zoom
      zoomPos.current = 0
    }
  })

  useFrame(({ camera }) => {
    // On card selection, zoom on it
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

  useFrame(({ camera }) => {

    // Get mouse action to limit zoomin / zoomout
    const isZoomIn = (camera.position.z + zoomPos.current < lastZoomValue.current);
    const isZoomOut = (camera.position.z + zoomPos.current > lastZoomValue.current);
    lastZoomValue.current = camera.position.z;

    // Rotate x/y axis to follow the mouse pointer
    const x = (1 - mouse.current[0]) * 0.0005;
    const y = (1 - mouse.current[1]) * 0.0005;
    camera.rotation.x += 0.05 * (y - camera.rotation.x);
    camera.rotation.y += 0.05 * (x - camera.rotation.y);

    // Check if we authorize zoom
    const process = state.zoomEnabled && !(isZoomOut && camera.position.z >= state.maxZ) && !(isZoomIn && camera.position.z <= state.minZ)

    if (!state.card && process) {

      let maxVelocity;
      const currentZoomPos = zoomPos.current;
      if (isZoomIn) {
        maxVelocity = -state.maxVelocity; 
      } else if (isZoomOut) {
        maxVelocity = state.maxVelocity; 
      }
      // camera.position.z = lerp(camera.position.z, (camera.position.z + zoomPos.current * 0.8) , 0.001)
      const newVelocity = (currentZoomPos * 0.1);
      const velocity = (Math.abs(newVelocity) >= state.maxVelocity) ? maxVelocity : newVelocity;
      camera.position.z = camera.position.z + velocity
    }

    //  ZoomIn or ZoomOut prohibited, adapt zoom position to match world view
    if (!process && isZoomOut) {
      zoomPos.current -= 1;
    } else if (!process && isZoomIn) {
      zoomPos.current += 1;
    }

  })

  useEffect(() => {
    zoomPos.current = 0;
  }, [state.card, zoomPos]);

  return (
    <>
    </>
  )
}

export default Controls