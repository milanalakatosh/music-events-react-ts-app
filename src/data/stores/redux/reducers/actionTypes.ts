import { CardPosition, EventId, EventValues } from '../../../../views/components/types'

//events
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

//eventId
export const SET_EVENT_ID = 'SET_EVENT_ID'

export type SetEventIdAction = {
  type: typeof SET_EVENT_ID
  payload: EventId
}

export type EventIdTypes = SetEventIdAction

export const setEventId = (eventId: EventId): SetEventIdAction  => ({
  type: SET_EVENT_ID,
  payload: eventId,
})

//position
export const SET_POSITION = 'SET_POSITION'

export type SetEventPositionAction = {
  type: typeof SET_POSITION
  payload: CardPosition
}

export type EventPositionTypes = SetEventPositionAction

export const setPosition = (position: CardPosition): SetEventPositionAction  => ({
  type: SET_POSITION,
  payload: position,
})
