import React from 'react'
import { authInitialState, authReducer } from './reducers/auth.reducer'

export const Store = React.createContext<any>(authInitialState)

export function StoreProvider({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element {
  const [state, dispatch] = React.useReducer(authReducer, authInitialState)
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}
