import { z } from 'zod'
import { EventSchema } from '../../../views/components/types'

const EventsStateSchema = z.object({
  events: EventSchema.array(),
})

export type EventsState = z.infer<typeof EventsStateSchema>

export const initState: EventsState = {
	events: [],
}