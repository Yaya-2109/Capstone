const SET_COORDS = 'SET_COORDS'
const SET_BOUNDS = 'SET_BOUNDS'
const SET_USER_COORDS = 'SET_USER_COORDS'

export const setCoords = coords => ({type: SET_COORDS, coords})

export const setBounds = bounds => ({type: SET_BOUNDS, bounds})

export const setUserCoords = userCoords => ({type: SET_USER_COORDS, userCoords})

let initialState = {
  coords: {},
  bounds: null,
  userCoords: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_COORDS:
      return {...state, coords: action.coords}
    case SET_BOUNDS:
      return {...state, bounds: action.bounds}
    case SET_USER_COORDS:
      return {...state, userCoords: action.userCoords}
    default:
      return state
  }
}

