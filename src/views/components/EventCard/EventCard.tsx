import * as React from 'react'
import { EventId, EventValues } from '../types'
import styles from './EventCard.module.scss'

export type EventCardProps = Readonly<{
  event: EventValues,
	onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, eventId: EventId) => void
}>

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {

	return (
		<div className={styles.card} onClick={(e) => onClick(e, event.id)}>
			<img
				className={styles.cardImg}
				src={event.images[0].url}
				alt={event.name}
			/>
		</div>
	)
}
