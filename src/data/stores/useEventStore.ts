import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { EventValues } from '../../views/components/types'

export type State = Readonly<{
  event: EventValues | undefined
}>

export type Actions = Readonly<{
  setEvent: (event: EventValues) => void
}>

const initialState: State = {
  event: undefined
}

export const useEventStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        event: initialState.event,
        setEvent: (value) => set(() => ({ event: value })),
      }),
      {
        name: 'event',
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)
