import { EventValues } from '../../../../views/components/types'

export const SET_EVENTS = 'SET_EVENTS'

export type SetEventsAction = {
  type: typeof SET_EVENTS
  payload: Array<EventValues>
}

export type EventActionTypes = SetEventsAction

export const setEvents = (events: Array<EventValues>): SetEventsAction => ({
  type: SET_EVENTS,
  payload: events,
})