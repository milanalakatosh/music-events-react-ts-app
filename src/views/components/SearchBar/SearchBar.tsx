import * as React from 'react'
import styles from './SearchBar.module.scss'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = Readonly<{
  onSearch: (value: string) => void
}> 

export const SearchBar: React.FC<Props> = ({ onSearch }) => {

  const [searchTerm, setSearchTerm] = React.useState<string>('')

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
    // Call the onSearch function with the updated search term
    onSearch(e.target.value);
  };

  return (
		<div className={styles.searchBar}>
      <button onClick={handleInputChange}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
     <input
        className={styles.inputSearch}
        type='text'
        placeholder='Search for events'
        value={searchTerm}
        onChange={handleInputChange}
      />
		</div>
	)
}