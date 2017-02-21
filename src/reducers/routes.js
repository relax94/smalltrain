import * as Route from '../constants/Dozor'
import * as Utils from '../utils/tools'

const initialRoute = {
    routes: [],
    devices: [],
    observables: [],
    checkpointAlerts: [],
    error: '',
    fetching: false,
    isSelectingObservables: false
}

export default function routes(state = initialRoute, action) {
    debugger;
    switch (action.type) {
        case Route.GET_ROUTES_REQUEST:
            return {...state, fetching: true};
        case Route.GET_ROUTES_SUCCESS:
            return {...state, routes: action.payload};
        case Route.GET_ROUTES_DEVICES_SUCCESS: // Logic to update devices observables
            return {...state, devices: action.payload, checkpointAlerts: state.observables.map((obs) => {
                return state.devices[0].filter(dev => Utils.distanceBetweenXY(obs, dev.loc) < 1000);
            })};
        case Route.GET_ROUTES_DEVICES_REQUEST:
            return {...state, fetching: true};
        case Route.GET_ROUTES_FAIL:
            return {...state, error: action.payload};
        case Route.ADD_ROUTE_POINT: // rename
            return {...state, isSelectingObservables: false};
        case Route.ADD_OBSERVABLE_POINT:
            return {...state, observables: state.observables.concat(action.payload)}; //???? NO NO NO
        case Route.REMOVE_OBSERVABLE_POINT:
            return {...state, observables: state.observables.filter((it, index) => index !== action.payload)}; //???? NO NO NO
        case Route.START_SELECTING_OBSERVABLES:
            return {...state, isSelectingObservables: true};
        case Route.STOP_SELECTING_OBSERVABLES:
            return {...state, isSelectingObservables: false};
        default:
            return state;

    }
}