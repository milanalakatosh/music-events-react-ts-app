import { initState } from '../initState'
import { SET_EVENTS, SetEventsAction } from './actionTypes'

export const eventsReducer = (state=initState, action: SetEventsAction) => {
  const { type, payload } = action
  switch (type) {
    case SET_EVENTS:
      return payload
      default:
        return state
  }
}