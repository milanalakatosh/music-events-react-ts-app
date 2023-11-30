import * as React from 'react'
import { apiKey } from '../../../data/apiKeys'
import { EventCard } from '../EventCard/EventCard'
import { EventCardValues } from '../types'
import { FlexContainer } from '../FlexContainer/FlexContainer'

export const AllGenres: React.FC = () => {

	const [events, setEvents] = React.useState<Array<EventCardValues>>([])
  const [loading, setLoading] = React.useState(true)

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
				console.log(111, data)

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
		<FlexContainer wrap responsiveGap justifyContentSpaceAround>
			{events &&
				events.map((event) => <EventCard key={event.id} event={event} />)}
		</FlexContainer>
	)
}
