import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import './styles/app.css'

import App from './containers/App'
import Home from './containers/Home'
import About from './components/About'

import {configureStore} from './store/configureStore'
import { syncHistoryWithStore } from 'react-router-redux'

import {Router, Route, IndexRoute, browserHistory} from 'react-router'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <IndexRoute component={Home}/>
                <Route path='about' component={About}/>
            </Route>
        </Router>
    </Provider>
    , document.getElementById('root'));