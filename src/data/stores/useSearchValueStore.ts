import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

export type State = Readonly<{
	searchValue: string
}>

export type Actions = Readonly<{
	setSearchValue: (value: string) => void
}>

const initialState: State = {
	searchValue: '',
}

export const useSearchValueStore = create<State & Actions>()(
	devtools(
		persist(
			(set) => ({
				searchValue: initialState.searchValue,
				setSearchValue: (value) => set(() => ({ searchValue: value })),
			}),
			{
				name: 'searchValue',
				storage: createJSONStorage(() => sessionStorage),
			}
		)
	)
)
