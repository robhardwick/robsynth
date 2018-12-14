import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import initSubscriber from 'redux-subscriber'
import rootReducer from './reducers'
import Synth from './audio/synth'
import App from './components/app'

// Create redux store
const store = createStore(rootReducer)
initSubscriber(store)

// Create WebAudio synth
new Synth(store)

// Initialise app
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
)