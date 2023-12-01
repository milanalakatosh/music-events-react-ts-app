import * as React from 'react'
import { apiKey } from '../../../data/apiKeys'
import { EventCard } from '../EventCard/EventCard'
import { CardPosition, EventValues, EventId } from '../types'
import { FlexContainer } from '../FlexContainer/FlexContainer'
import { EventModal } from '../EventModal/EventModal'

export const AllGenres: React.FC = () => {

	const [events, setEvents] = React.useState<Array<EventValues>>([])
  const [loading, setLoading] = React.useState(true)
  const [position, setPosition] = React.useState<Readonly<CardPosition>>({
		top: 0,
		right: 0,
	})
  const [selectedEventId, setSelectedEventId] = React.useState<EventId | undefined>(undefined)

	const handleCardClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		eventId: EventId
	) => {
		const rect = event.currentTarget.getBoundingClientRect()
		setSelectedEventId(eventId)
		setPosition({ top: rect.bottom, right: rect.left })
	}

	const handleModalClose = () => {
		setSelectedEventId(undefined)
	}

	React.useEffect(() => {
    const fetchEvents = async () => {
      try {
				const response = await fetch(
					`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=FI&classificationId=KZFzniwnSyZfZ7v7nJ&apikey=${apiKey}`
				)

				if (!response.ok) {
					throw new Error('No response from the network')
				}

				const data = await response.json()

				setEvents(data._embedded.events)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching events:', error)
				setLoading(false)
			}
		}

		fetchEvents()
	}, [])

  if (loading) {
    return <p>Loading...</p>
  }

	return (
		<>
			<FlexContainer wrap responsiveGap justifyContentSpaceAround>
				{events &&
					events.map((event) => <EventCard key={event.id} event={event} onClick={(e) => handleCardClick(e, event.id)}/>)}
			</FlexContainer>
			{selectedEventId && (
				<EventModal
					eventId={selectedEventId}
					onClose={handleModalClose}
					position={position}
				/>
			)}
		</>
	)
}