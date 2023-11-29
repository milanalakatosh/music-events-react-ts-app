import * as React from 'react'
import styles from './Menu.module.scss'
import { FlexContainer } from '../../FlexContainer/FlexContainer'
import { MenuProps } from '../types'

export const DesktopMenu: React.FC<MenuProps> = ({ menuItems }) => {

	return (
		<FlexContainer>
			{/* when the routing is implemented, then use a instead of <a> <NavLink> or <Link> from 'react-router-dom' */}
			{menuItems.map(({ title, to }, index) => (
				<a className={styles.menuItems} key={`menu-item-${index}`} href={to}>
					{title}
				</a>
			))}
		</FlexContainer>
	)
}
