import * as Route from '../constants/Dozor'

const initialRoute = {
    routes: [],
    devices: [],
    observables: [],
    error: '',
    fetching: false,
    isSelectingObservables: false
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
        case Route.ADD_ROUTE_POINT:
            return {...state};
        case Route.ADD_OBSERVABLE_POINT:
            return {...state, observables: action.payload};
        case Route.START_SELECTING_OBSERVABLES:
            return {...state, isSelectingObservables: true};
        case Route.STOP_SELECTING_OBSERVABLES:
            return {...state, isSelectingObservables: false};
        default:
            return state;

    }
}