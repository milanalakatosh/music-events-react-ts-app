import * as React from 'react'
import styles from './Header.module.scss'
import { FlexContainer } from '../FlexContainer/FlexContainer'
import { HeaderItemDefinition, headerItems } from './headerItems'
import { SearchBar } from '../SearchBar/SearchBar'

export const Header: React.FC = () => {
  const menuItems: ReadonlyArray<HeaderItemDefinition> = headerItems

  const [searchResults, setSearchResults] = React.useState<ReadonlyArray<string>>([]);

  const handleSearch = (searchTerm:string): void => {
    // For simplicity, just filter an array of example data
    const exampleData = ['blues', 'rock', 'pop', 'jazz', 'func']
    const filteredResults = exampleData.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(filteredResults)
  };

  return (
		<div className={styles.menu}>
			<FlexContainer vertical className={styles.menuContainer}>
				<FlexContainer fixedDirection justifyContentSpaceBetween alignItemsCenter>
					<h1 className={styles.menuHeader}>Music Events</h1>
					<SearchBar onSearch={handleSearch} />
				</FlexContainer>
				<FlexContainer fixedDirection>
					{/* when the routing is implemented, then use a instead of <a> <NavLink> or <Link> from 'react-router-dom' */}
					{menuItems.map(({ title, to }, index) => (
						<a className={styles.menuItems} key={`menu-item-${index}`} href={to}>
							{title}
						</a>
					))}
				</FlexContainer>
			</FlexContainer>
		</div>
	)
}
