import * as React from 'react'
import styles from './Menu.module.scss'
import { MenuProps } from '../types'
import { FlexContainer } from '../../FlexContainer/FlexContainer'

export const MobileMenu: React.FC<MenuProps> = ({ menuItems }) => {

  const [mobileMenuVisible, setMobileMenuVisible] = React.useState<boolean>(false)

  const toggleMenu = () => {
		setMobileMenuVisible(!mobileMenuVisible)
	}

	return (
		<FlexContainer fitWidth alignItemsCenter className={styles.menuMobile}>
			<button className={styles.menuButton} onClick={toggleMenu}>
				Menu
			</button>

			{mobileMenuVisible && (
				<FlexContainer fitWidth className={styles.menuMobileList}>
					{menuItems.map(({ title, to }, index) => (
						<a
							className={styles.menuItems}
							key={`menu-item-${index}`}
							href={to}
						>
							{title}
						</a>
					))}
				</FlexContainer>
			)}
		</FlexContainer>
	)
}
