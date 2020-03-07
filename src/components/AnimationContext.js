import React, { createContext, useReducer } from 'react'

const initialState = {
  cardsContainer: null,
  card: null,
  minZ: 0,
  maxZ: 8,
  maxVelocity: 0.3,
  zoomEnabled: true,
  cursor: 'pointer',
  cameraMatrixWorld: 0
}

const reducer = (state, { type, value }) => {
  switch (type) {
    case "select":
      return { ...state, card: value }
    case "zoomEnabled":
      return { ...state, zoomEnabled: value }
    case "setMinZ":
      return { ...state, minZ: value }
    case "setCardsContainer":
      return { ...state, cardsContainer: value }
    case "setCursor":
      return { ...state, cursor: value }
    case "setCameraMatrixWorld":
      return { ...state, cameraMatrixWorld: value}
    default:
      console.warn(`ERROR STATE ${type} ${value}`)
      return { ...state }
  }
}

export const StateContext = createContext()
export const DispatchContext = createContext()

const AnimationContext = ({ children, cursor, controls }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {controls}
        {/* {cursor} */}
      </StateContext.Provider>
      {children}
    </DispatchContext.Provider>
  )

}

export default AnimationContext