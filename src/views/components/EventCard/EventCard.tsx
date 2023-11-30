import * as React from 'react'
import { CardPosition, EventCardValues } from '../types'
import styles from './EventCard.module.scss'
import { EventModal } from '../EventModal/EventModal'

export type EventCardProps = Readonly<{
  event: EventCardValues
}>

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
	const [eventModalOpened, setEventModalOpened] = React.useState<boolean>(false)
	const [position, setPosition] = React.useState<Readonly<CardPosition>>({
		top: 0,
		right: 0,
	})

	const handleCardClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const rect = event.currentTarget.getBoundingClientRect()
		setPosition({ top: rect.bottom, right: rect.left })
		setEventModalOpened(true)
	}

	const handleModalClose = () => {
		setEventModalOpened(false)
	}

	return (
		<div className={styles.card} onClick={handleCardClick}>
			<img
				className={styles.cardImg}
				src={event.images[0].url}
				alt={event.name}
			/>
			{eventModalOpened && (
				<EventModal
					event={event}
					onClose={handleModalClose}
					position={position}
				/>
			)}
		</div>
	)
}
