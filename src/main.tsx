import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './views/App'

import './views/styles/reset.scss'
import './views/styles/common.scss'
import { Provider } from 'react-redux'
import { store } from './data/stores/redux/store'

createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
