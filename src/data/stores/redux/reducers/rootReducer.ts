import { eventsReducer } from './eventsReducer'
import { combineReducers } from 'redux'
import { positionReducer } from './positionEventReducer'
import { eventIdReducer } from './eventsIdReducer'

export const rootReducer = combineReducers({
  events: eventsReducer,
  position: positionReducer,
  eventId: eventIdReducer
}
)
