import { eventsReducer } from './eventsReducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  events: eventsReducer
}
)
