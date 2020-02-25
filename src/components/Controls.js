import React, { useContext } from 'react'
import { DispatchContext, StateContext } from './AnimationContext'

const Controls = () => {

  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  return (
    <>
    </>
  )
}

export default Controls