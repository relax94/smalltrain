import * as Route from '../constants/Dozor'

const initialRoute = {
    routes: [],
    devices: [],
    error: '',
    fetching: false
}

export default function routes(state = initialRoute, action) {
    switch (action.type) {
        case Route.GET_ROUTES_REQUEST:
            return {...state, fetching: true};
        case Route.GET_ROUTES_SUCCESS:
            return {...state, routes: action.payload};
        case Route.GET_ROUTES_DEVICES_SUCCESS:
            return {...state, devices: action.payload};
        case Route.GET_ROUTES_DEVICES_REQUEST:
            return {...state, fetching: true};
        case Route.GET_ROUTES_FAIL:
            return {...state, error: action.payload};
        default:
            return state;

    }
}