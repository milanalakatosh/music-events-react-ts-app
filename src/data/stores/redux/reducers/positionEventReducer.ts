import { initState } from '../initState'
import { SET_POSITION, SetEventPositionAction } from './actionTypes'

export const positionReducer = (state=initState, action: SetEventPositionAction) => {
  const { type, payload } = action
  switch (type) {
    case SET_POSITION:
      return payload
      default:
        return state
  }
}