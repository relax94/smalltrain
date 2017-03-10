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
    switch (action.type) {
        case Route.GET_ROUTES_REQUEST:
            return {...state, fetching: true};
        case Route.GET_ROUTES_SUCCESS:
            return {...state, routes: action.payload};
        case Route.GET_ROUTES_DEVICES_SUCCESS: { // Logic to update devices observables
            // HARDCODE TO TEST SOME LOGIC
            let checkoutPointsCandidates = [];
            state.observables.map((obs, observerId) => {
                let query = state.devices[0].filter(dev => Utils.distanceBetweenXY(obs, dev.loc) < 250 && !checkoutPointsCandidates.includes(dev));
                if (query.length > 0)
                    checkoutPointsCandidates.push({observerId: observerId, devices: query});
                return;
            });
            return {...state, devices: action.payload, checkpointAlerts: checkoutPointsCandidates};
        }
        case Route.GET_ROUTES_DEVICES_REQUEST:
            return {...state, fetching: true};
        case Route.GET_ROUTES_FAIL:
            return {...state, error: action.payload};
        case Route.ADD_ROUTE_POINT: // rename
            return {...state, isSelectingObservables: false};
        case Route.GET_OBSERVABLE_POINTS: {
            debugger;
            let alerts = [];
            action.payload.map((obs, observerId) => {
                let query = state.devices[0].filter(dev => Utils.distanceBetweenXY(obs, dev.loc) < 250 && !alerts.includes(dev));
                if (query.length > 0)
                    alerts.push({observerId: observerId, devices: query});
                return;
            });
            return {...state, observables: action.payload, checkpointAlerts: alerts};
        }
        case Route.ADD_OBSERVABLE_POINT:
            return {...state, observables: state.observables.concat(action.payload)}; //???? NO NO NO
        case Route.UPDATE_OBSERVABLE_POINT: {
            const {index, point} = action.payload;
            let updated = state.observables;
            updated[index] = point;
            return {...state, observables: updated};
        }
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