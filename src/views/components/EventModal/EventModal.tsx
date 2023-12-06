import * as React from 'react'
import { CardPosition, EventId } from '../types'
import styles from './EventModal.module.scss'
import { FlexContainer } from '../FlexContainer'
import { apiKey } from '../../../data/apiKeys'
import { patternText } from '../../../data/stores/const'
import calendarIcon from  './calendarIcon.svg'
import placeIcon from  './placeIcon.svg'
import {format, parseISO} from 'date-fns'
import { useEventStore } from '../../../data/stores/useEventStore'

export type IconWithTextProps = React.PropsWithChildren &
	Readonly<{
		text: string
		className?: string
	}>

const IconWithText: React.FC<IconWithTextProps> = ({ children, text }) => (
	<FlexContainer fixedDirection responsiveGap  className={styles.iconWithText}>
		{children}
		<p>{text}</p>
	</FlexContainer>
)

export type EventCardProps = Readonly<{
	eventId: EventId
	onClose: () => void
	position: Readonly<CardPosition>
}>

export const EventModal: React.FC<EventCardProps> = ({
	eventId,
	onClose,
	position,
}) => {
	const event = useEventStore((store) => store.event)
	const setEvent = useEventStore((store) => store.setEvent)

	React.useEffect(() => {
		const fetchEventInfo = async () => {
			try {
				const response = await fetch(
					`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${apiKey}`
				)

				if (!response.ok) {
					throw new Error('Network response was not ok')
				}

				const data = await response.json()
				setEvent(data)
			} catch (error) {
				console.error('Error fetching event info:', error)
			}
		}
		fetchEventInfo()
	}, [eventId])

	return (
		<>
			{event && (
				<div
					style={{ top: position.top + 16, right: 0 }}
					className={styles.eventModalOverlay}
					onClick={onClose}
				>
					<div
						className={styles.arrow}
						style={{ top: position.top - 20, left: position.left + 140 }}
					></div>
					<FlexContainer
						noGap
						justifyContentSpaceBetween
						className={styles.eventModal}
					>
						<FlexContainer vertical responsiveGap className={styles.eventInfo}>
							<h3 className={styles.eventHeader}>{event.name}</h3>

							<IconWithText
								text={`${format(
									new Date(parseISO(event.dates.start.localDate)),
									'iiii'
								)}, ${format(
									new Date(parseISO(event.dates.start.localDate)),
									'MM.dd.yyyy'
								)}
									@ ${event.dates.start.localTime.slice(0, 5)}`}
							>
								<img src={calendarIcon} alt='calendar icon' />
							</IconWithText>

							<IconWithText
								text={`${event.promoter.name.toUpperCase()}, 
									${event.dates.timezone.substring(event.dates.timezone.search(/\//) + 1)}`}
							>
								<img src={placeIcon} alt='place icon' />
							</IconWithText>

							<p className={styles.eventTextInfo}>
								{event.info ?? patternText}
							</p>
							<button className={styles.eventButton} onClick={onClose}>
								Close details
							</button>
						</FlexContainer>
						<div className={styles.eventImgContainer}>
							<img src={event.images[0].url} alt={event.name} />
							<div className={styles.eventImgBlur}></div>
						</div>
					</FlexContainer>
				</div>
			)}
		</>
	)
}
