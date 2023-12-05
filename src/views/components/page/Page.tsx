import * as React from 'react'
import { Header } from '../Header'
import styles from './Page.module.scss'
import clsx from 'clsx'
import { Footer } from '../Footer'

export type Props = Readonly<{
  id?: string
  showHeader?: boolean
	showFooter?: boolean
  className?: string
}> &
  React.PropsWithChildren

export const Page: React.FC<Props> = ({ id, showHeader = true, showFooter = true, className, children }) => {

  return (
		<>
			{showHeader && <Header />}
			<div id={id} className={clsx(styles.pageContent, className)}>
				<main>{children}</main>
			</div>
			{showFooter && <Footer/>}
		</>
	)
}
