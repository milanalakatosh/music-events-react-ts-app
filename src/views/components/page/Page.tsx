import * as React from 'react'
import { Header } from '../Header/Header'
import styles from './Page.module.scss'
import clsx from 'clsx'

export type Props = Readonly<{
  id?: string
  showHeader?: boolean
  className?: string
}> &
  React.PropsWithChildren

export const Page: React.FC<Props> = ({ id, showHeader = true, className, children }) => {

  return (
		<>
			{showHeader && <Header />}
			<div id={id} className={clsx(styles.pageContent, className)}>
				<main>{children}</main>
			</div>
		</>
	)
}
