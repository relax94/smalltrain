import {combineReducers} from 'redux'
import page from './page'
import user from './user'
import images from './images'
import routes from './routes'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
    page: page,
    user: user,
    images: images,
    routes: routes,
    routing: routerReducer
});
