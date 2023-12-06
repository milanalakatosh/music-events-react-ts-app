import { z } from 'zod'
import { CardPositionSchema, EventIdSchema, EventSchema } from '../../../views/components/types'

const EventsStateSchema = z.object({
  events: EventSchema.array(),
  position: CardPositionSchema,
  eventId: EventIdSchema
})

export type EventsState = z.infer<typeof EventsStateSchema>

export const initState: EventsState = {
	events: [],
  position: {
		top: 0,
		left: 0,
	}, 
  eventId: ''

}