import * as React from 'react'
import { CardPosition, EventId, EventValues } from '../types'
import styles from './EventModal.module.scss'
import { FlexContainer } from '../FlexContainer/FlexContainer'
import { apiKey } from '../../../data/apiKeys'

export type EventCardProps = Readonly<{
  eventId: EventId
	onClose: () => void
	position: Readonly<CardPosition>
}>

export const EventModal: React.FC<EventCardProps> = ({ eventId, onClose, position }) => {
	const [eventInfo, setEventInfo] = React.useState<EventValues | undefined>(undefined)

	React.useEffect(() => {
    const fetchEventInfo = async () => {
      try {
        const response =  await fetch(
          `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${apiKey}`
        )

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        setEventInfo(data)
      } catch (error) {
        console.error('Error fetching event info:', error)
      }
    }
		fetchEventInfo();
	}, [eventId])

	return (
		<>
			{eventInfo && (
				<div
					style={{ top: position.top + 16, right: 0 }}
					className={styles.eventModalOverlay}
					onClick={onClose}
				>
					<div className={styles.arrow} style={{ top: position.top - 20, left: position.left + 140 }}></div>
					<FlexContainer
						justifyContentSpaceBetween
						className={styles.eventModal}
					>
						<FlexContainer vertical>
							<h3>{eventInfo.name}</h3>
							<p>Date: {eventInfo.dates.start.localDate}</p>
							<p>{eventInfo.info}</p>
							<button onClick={onClose}>Close details</button>
						</FlexContainer>
						<img src={eventInfo.images[0].url} alt={eventInfo.name} />
					</FlexContainer>
				</div>
			)}
		</>
	)
}
