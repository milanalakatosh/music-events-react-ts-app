import * as React from 'react'
import styles from './Header.module.scss'
import { FlexContainer } from '../FlexContainer'
import { SearchBar } from '../SearchBar'
import { MobileMenu } from './Menu/MobileMenu'
import { DesktopMenu } from './Menu/DesktopMenu'
import { MenuItemDefinition, menuItemsList } from './menuItems'

export const Header: React.FC = () => {
	const menuItems: ReadonlyArray<MenuItemDefinition> = menuItemsList

	const [isSmallScreen, setIsSmallScreen] = React.useState(
		window.matchMedia('(max-width: 900px)').matches
	)

	React.useEffect(() => {
		//TODO: to implement useMediaQuery(breakpoints.down('md')) from material mui cause the code is shorter
		const mediaQuery = window.matchMedia('(max-width: 900px)')

		const handleScreenChange = (e: MediaQueryListEvent): void => {
			setIsSmallScreen(e.matches)
		}

		mediaQuery.addEventListener('change', handleScreenChange)

		// Clean up the event listener on component unmount
		return () => {
			mediaQuery.removeEventListener('change', handleScreenChange)
		}
	}, [])

	return (
		<div className={styles.menu}>
			<FlexContainer vertical className={styles.menuContainer}>
				<FlexContainer
					justifyContentSpaceBetween
				>
					<h1 className={styles.menuHeader}>Music Events</h1>
					<SearchBar />
				</FlexContainer>
				{isSmallScreen ? (
					<MobileMenu menuItems={menuItems} />
				) : (
					<DesktopMenu menuItems={menuItems} />
				)}
			</FlexContainer>
		</div>
	)
}
