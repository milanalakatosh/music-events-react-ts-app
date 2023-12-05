import * as React from 'react'
import { FlexContainer } from '../FlexContainer'
import styles from './Footer.module.scss'

export const Footer: React.FC = () => {

  return (
    <FlexContainer alignItemsCenter justifyContentCenter className={styles.footerContainer}>
      <span>Fitek 2023</span>
    </FlexContainer>
  )
}
