import * as RouteType from '../constants/Dozor'
import FirebaseService from '../services/FirebaseService'
/*import {NetworkMethod} from '../constants/Network'
import {makeRequest} from '../utils/network'*/
const FS = new FirebaseService();

export function getRoutes() {
    return function (dispatch) {
        dispatch({
            type: RouteType.GET_ROUTES_REQUEST
        });
     /*   makeRequest('', NetworkMethod.GET)
            .then((response) => {*/
                dispatch({
                    type: RouteType.GET_ROUTES_SUCCESS,
                    payload: [{id: 550, label: '1'},{id: 793, label: '19'}]
                });
          /*  })
            .catch((err) => {
                dispatch({
                    type: RouteType.GET_ROUTES_FAIL,
                    payload: err
                });
            });*/
    }
}


export function getRouteDevices(routeId) {
    return function (dispatch) {
        dispatch({
            type: RouteType.GET_ROUTES_DEVICES_REQUEST,
            payload: routeId
        });

        FS.subscribe('dozor', (dozorDevices) => {
            dispatch({
                type: RouteType.GET_ROUTES_DEVICES_SUCCESS,
                payload: Object.values(dozorDevices)
            });
        });
    }
}

export function addRoutePoint(point){
    return function (dispatch) {
        FS.writeData(point);
        dispatch({
            type: RouteType.ADD_ROUTE_POINT,
            payload: point
        });
    }
}

export function selecting(isSelecting) {
    return function(dispatch){
        dispatch({
            type: isSelecting ? RouteType.START_SELECTING_OBSERVABLES : RouteType.STOP_SELECTING_OBSERVABLES
        })
    }
}

export function removeObservablePoint(index){
    return function(dispatch){
        dispatch({
            type: RouteType.REMOVE_OBSERVABLE_POINT,
            payload: index
        })
    }
}

export function addObservablePoint(point) {
    return function (dispatch) {
        dispatch({
            type: RouteType.ADD_OBSERVABLE_POINT,
            payload: point
        })
    }
}