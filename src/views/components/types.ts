import * as z from 'zod'

const StringIdSchema = z.string().min(1)

export const EventIdSchema = StringIdSchema
export type EventId = z.infer<typeof EventIdSchema>

export const EventSchema = z.object({
  id: EventIdSchema,
  name: z.string(),
  dates: z.object({
    start: z.object({
      localDate: z.string()
    })
  }),
  images: z.object({
    url: z.string()
  }).array(),
  info: z.string()
})
export type EventValues = z.infer<typeof EventSchema>

export const CardPositionSchema = z.object({
  top: z.number(), 
  right: z.number()
})
export type CardPosition = z.infer<typeof CardPositionSchema>