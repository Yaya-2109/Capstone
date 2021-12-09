
const SET_SUCCESS = 'SET_SUCCESS'

export const setSuccess = (success) => {
  return { type: SET_SUCCESS, success}
}

export default function(state = false, action) {
  switch (action.type) {
    case SET_SUCCESS:
      return action.success
    default:
      return state
  }
}
