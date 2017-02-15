import {combineReducers} from 'redux'
import page from './page'
import user from './user'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
    page: page,
    user: user,
    routing: routerReducer
});
