export const authInitialState = {
  isAuthenticated: false,
}

export function authReducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_AUTHENTICATION':
      return { ...state, isAuthenticated: true }
    default:
      return state
  }
}
