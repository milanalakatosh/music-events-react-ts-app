/// <reference types="vite-plugin-svgr/client" />
import * as React from 'react'
import { CardPosition, EventId } from '../types'
import styles from './EventModal.module.scss'
import { FlexContainer } from '../FlexContainer'
import { apiKey } from '../../../data/apiKeys'
import { patternText } from '../../../data/stores/const'
import CalendarIcon from  '../../../assets/icons/calendarIcon.svg?react'
import PlaceIcon from  '../../../assets/icons/placeIcon.svg?react'
import {format, parseISO} from 'date-fns'
import { useEventStore } from '../../../data/stores/useEventStore'
import { useSelector } from 'react-redux'

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
	onClose: () => void
}>

export const EventModal: React.FC<EventCardProps> = ({ onClose }) => {
	const event = useEventStore((store) => store.event)
	const setEvent = useEventStore((store) => store.setEvent)

	const position = useSelector(
		(state: { position: Readonly<CardPosition> }) => state.position
	)

	const eventId = useSelector(
		(state: { eventId: Readonly<EventId> }) => state.eventId
	)

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
			{event && position && (
				<div
					style={{ top: position.top + 16, right: 0, left: 0 }}
					className={styles.eventModalOverlay}
					onClick={onClose}
				>
					<div
						className={styles.arrow}
						style={{ top: position.top - 20, left: position.left + 140 }}
					></div>
					<FlexContainer
						fixedDirection
						noGap
						justifyContentSpaceBetween
						className={styles.eventModal}
					>
						<FlexContainer vertical justifyContentSpaceAround responsiveGap className={styles.eventInfo}>
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
								{/* <img src={calendarIcon} alt='calendar icon' /> */}
								<CalendarIcon />
							</IconWithText>

							<IconWithText
								text={`${event.promoter.name.toUpperCase()}, 
									${event.dates.timezone.substring(event.dates.timezone.search(/\//) + 1)}`}
							>
								<PlaceIcon />
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
