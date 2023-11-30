import * as React from 'react'
import { CardPosition, EventCardValues } from '../types'
import styles from './EventModal.module.scss'
import { FlexContainer } from '../FlexContainer/FlexContainer'

export type EventCardProps = Readonly<{
  event: EventCardValues
	onClose: () => void
	position: Readonly<CardPosition>
}>

export const EventModal: React.FC<EventCardProps> = ({ event, onClose, position }) => {
	console.log(222, position)

	return (
		<div
			style={{ top: position.top, right: 0 }}
			className={styles.eventModalOverlay}
			onClick={onClose}
		>
			<FlexContainer
				justifyContentSpaceBetween
				className={styles.eventModal}
			>
				<FlexContainer vertical>
					<h3>{event.name}</h3>
					<p>Date: {event.dates.start.localDate}</p>
					<p>{event.info}</p>
					<button onClick={onClose}>Close details</button>
				</FlexContainer>
				<img src={event.images[0].url} alt={event.name} />
			</FlexContainer>
		</div>
	)
}
