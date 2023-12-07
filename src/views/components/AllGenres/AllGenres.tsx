import * as React from 'react'
import { apiKey } from '../../../data/apiKeys'
import { EventCard } from '../EventCard'
import { EventValues, EventId } from '../types'
import { FlexContainer } from '../FlexContainer'
import { EventModal } from '../EventModal'
import { useDispatch, useSelector } from 'react-redux'
import { setEventId, setEvents, setPosition } from '../../../data/stores/redux/reducers/actionTypes'
import { useSearchValueStore } from '../../../data/stores/useSearchValueStore'

export const AllGenres: React.FC = () => {
	const events = useSelector(
		(state: { events: ReadonlyArray<EventValues> }) => state.events
	)
	const eventId = useSelector(
		(state: { eventId: any }) => state.eventId
	)

	const searchValue = useSearchValueStore((store) => store.searchValue)

	const dispatch = useDispatch()

	const [loading, setLoading] = React.useState(true) // TODO: to implement the react-query for the api requests and use request.isFetching from there

	const handleCardClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		eventId: EventId
	) => {
		const rect = event.currentTarget.getBoundingClientRect()
		dispatch(setEventId(eventId))
		dispatch(setPosition({ top: rect.bottom, left: rect.left }))

		if (event && rect) {
			if (rect.bottom + 400 > window.innerHeight) {
				const verticalScrollPoint = 400 - (window.innerHeight - rect.bottom)
				window.scrollTo({
					top: window.scrollY + verticalScrollPoint,
					behavior: 'smooth',
				})
				dispatch(
					setPosition({
						top: rect.bottom - verticalScrollPoint,
						left: rect.left,
					})
				)
			}
		}
	}

	const handleModalClose = () => {
		dispatch(setEventId(''))
	}

	React.useEffect(() => {
		const fetchEvents = async () => {
			try {
				console.log(1, searchValue)
				const response = await fetch(
					`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=FI&classificationId=KZFzniwnSyZfZ7v7nJ&apikey=${apiKey}&keyword=${searchValue}`
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
	}, [searchValue])


	if (loading) {
		return <p>Loading...</p>
	}

	return (
		<>
			<FlexContainer wrap justifyContentSpaceAround>
				{events &&
					events.map((event) => (
						<EventCard
							key={event.id}
							event={event}
							onClick={(e) => handleCardClick(e, event.id)}
						/>
					))}
			</FlexContainer>
			{eventId.length > 0 && <EventModal onClose={handleModalClose} />}
		</>
	)
}
