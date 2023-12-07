import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './views/App'

import './assets/styles/reset.scss'
import './assets/styles/common.scss'
import { Provider } from 'react-redux'
import { store } from './data/stores/redux/store'

createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
