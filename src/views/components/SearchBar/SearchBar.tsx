import * as React from 'react'
import styles from './SearchBar.module.scss'
import { useSearchValueStore } from '../../../data/stores/useSearchValueStore'

export const SearchBar: React.FC = () => {
  const searchValue = useSearchValueStore((store) => store.searchValue)
  const setSearchValue = useSearchValueStore((store) => store.setSearchValue)

	return (
		<div className={styles.searchBar}>
			<input
				className={styles.inputSearch}
				type='text'
				placeholder='🔍   Search for events'
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</div>
	)
}