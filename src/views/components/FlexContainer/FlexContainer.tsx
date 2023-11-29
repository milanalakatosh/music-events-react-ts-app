import * as React from 'react'
import clsx from 'clsx'
import styles from './FlexContainer.module.scss'

export type FlexContainerProps = Readonly<{
  fixedDirection?: boolean
  wrap?: boolean
  centeredInBlock?: boolean
  justifyContentCenter?: boolean
  justifyContentSpaceBetween?: boolean
  justifyContentSpaceAround?: boolean
  alignItemsCenter?: boolean
  vertical?: boolean
  responsiveGap?: boolean
  noGap?: boolean,
  fitWidth?: boolean
  className?: string
}> &
  React.PropsWithChildren

export const FlexContainer: React.FC<FlexContainerProps> = ({
  fixedDirection,
  wrap,
  centeredInBlock,
  justifyContentCenter,
  justifyContentSpaceBetween,
  justifyContentSpaceAround,
  alignItemsCenter,
  responsiveGap,
  noGap,
  vertical,
  fitWidth,
  className,
  children
}) => (
  <div
    className={clsx(styles.flexContainer, className, {
      [styles.fixedDirection]: fixedDirection,
      [styles.wrap]: wrap,
      [styles.centeredInBlock]: centeredInBlock,
      [styles.justifyContentCenter]: justifyContentCenter,
      [styles.justifyContentSpaceBetween]: justifyContentSpaceBetween,
      [styles.justifyContentSpaceAround]: justifyContentSpaceAround,
      [styles.alignItemsCenter]: alignItemsCenter,
      [styles.verticalDirection]: vertical,
      [styles.fixedGap]: !noGap && !responsiveGap,
      [styles.responsiveGap]: !noGap && responsiveGap,
      [styles.fitWidth]: fitWidth
    })}
  >
    {children}
  </div>
)