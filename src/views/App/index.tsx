import React from 'react'
import { Page } from '../components/Page/Page'
import { AllGenres } from '../components/AllGenres/AllGenres'

export const App: React.FC = () => {
  return (
    <Page>
      <AllGenres />
    </Page>
  )
}