import React, { createContext, useReducer } from 'react'

const reducer = (state, { type, value }) => {
  switch (type) {
    case "select":
      return { ...state, card: value }
    default:
      return Error('Error updating state')
  }
}

export const StateContext = createContext()
export const DispatchContext = createContext()

const AnimationContext = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, { card: null })

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )

}

export default AnimationContext