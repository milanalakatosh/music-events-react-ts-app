import * as z from 'zod'

export const EventCardSchema = z.object({
  id: z.string(),
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
export type EventCardValues = z.infer<typeof EventCardSchema>

export const CardPositionSchema = z.object({
  top: z.number(), 
  right: z.number()
})
export type CardPosition = z.infer<typeof CardPositionSchema>