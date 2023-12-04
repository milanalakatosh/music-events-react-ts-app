import * as React from 'react'
import { CardPosition, EventId, EventValues } from '../types'
import styles from './EventModal.module.scss'
import { FlexContainer } from '../FlexContainer/FlexContainer'
import { apiKey } from '../../../data/apiKeys'
import { patternText } from '../../../data/stores/const'
import calendarIcon from  './calendarIcon.svg'
import placeIcon from  './placeIcon.svg'

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
				console.log(123, eventInfo)
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
					<div
						className={styles.arrow}
						style={{ top: position.top - 20, left: position.left + 140 }}
					></div>
					<FlexContainer
						noGap
						justifyContentSpaceBetween
						className={styles.eventModal}
					>
						<FlexContainer vertical className={styles.eventInfo}>
							<h3 className={styles.eventHeader}>{eventInfo.name}</h3>
							<FlexContainer fixedDirection responsiveGap>
								<img
									className={styles.eventIcon}
									src={calendarIcon}
									alt='calendar icon'
								/>
								<p>
									{eventInfo.dates.start.localDate} @{' '}
									{eventInfo.dates.start.localTime}{' '}
								</p>
							</FlexContainer>

							<FlexContainer fixedDirection responsiveGap>
								<img
									className={styles.eventIcon}
									src={placeIcon}
									alt='place icon'
								/>
								<p className={styles.eventLocation}>{eventInfo.promoter.name}</p>
							</FlexContainer>

							<p className={styles.eventTextInfo}>{eventInfo.info ?? patternText}</p>
							<button onClick={onClose}>Close details</button>
						</FlexContainer>
						<div className={styles.eventImgContainer}>
							<img src={eventInfo.images[0].url} alt={eventInfo.name} />
							<div className={styles.eventImgBlur}></div>
						</div>
					</FlexContainer>
				</div>
			)}
		</>
	)
}
