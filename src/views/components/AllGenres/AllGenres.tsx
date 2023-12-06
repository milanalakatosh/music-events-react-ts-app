import * as React from 'react'
import { apiKey } from '../../../data/apiKeys'
import { EventCard } from '../EventCard'
import { CardPosition, EventValues, EventId } from '../types'
import { FlexContainer } from '../FlexContainer'
import { EventModal } from '../EventModal'
import { useDispatch, useSelector } from 'react-redux'
import { setEvents } from '../../../data/stores/redux/reducers/actionTypes'

export const AllGenres: React.FC = () => {

	const events = useSelector((state: { events: ReadonlyArray<EventValues> }) => state.events)

	const dispatch = useDispatch()

	const [loading, setLoading] = React.useState(true)
  const [position, setPosition] = React.useState<Readonly<CardPosition>>({
		top: 0,
		left: 0,
	})
  const [selectedEventId, setSelectedEventId] = React.useState<EventId | undefined>(undefined)

	const handleCardClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		eventId: EventId
	) => {
		const rect = event.currentTarget.getBoundingClientRect()
		setSelectedEventId(eventId)
		setPosition({ top: rect.bottom, left: rect.left })

		if (event && rect) {
			if (rect.bottom + 400 > window.innerHeight) {
				const verticalScrollPoint = 400 - (window.innerHeight - rect.bottom)
				window.scrollTo({
					top: window.scrollY + verticalScrollPoint,
					behavior: 'smooth',
				})
				setPosition({ top: rect.bottom - verticalScrollPoint, left: rect.left })
			}
		}
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

				dispatch(setEvents(data._embedded.events))
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
					events.map((event) => (
						<EventCard
							key={event.id}
							event={event}
							onClick={(e) => handleCardClick(e, event.id)}
						/>
					))}
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
