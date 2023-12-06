import { initState } from '../initState'
import { SET_EVENT_ID, SetEventIdAction } from './actionTypes'

export const eventIdReducer = (state=initState, action: SetEventIdAction) => {
  const { type, payload } = action
  switch (type) {
    case SET_EVENT_ID:
      return payload
      default:
        return state
  }
}