import React, { createContext, useReducer } from 'react'

const initialState = {
  card: null,
  zoomEnabled: true
}

const reducer = (state, { type, value }) => {
  switch (type) {
    case "select":
      return { ...state, card: value }
    case "zoomEnabled":
      return { ...state, zoomEnabled: value }
    default:
      return Error('Error updating state')
  }
}

export const StateContext = createContext()
export const DispatchContext = createContext()

const AnimationContext = ({ children, controls }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      {children}
      <StateContext.Provider value={state}>
        {controls}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )

}

export default AnimationContext