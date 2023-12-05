import React from 'react'
import { Page } from '../components/Page'
import { AllGenres } from '../components/AllGenres'

export const App: React.FC = () => {
  return (
    <Page>
      <AllGenres />
    </Page>
  )
}