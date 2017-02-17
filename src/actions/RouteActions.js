import * as RouteType from '../constants/Dozor'
import {NetworkMethod} from '../constants/Network'
import {makeRequest} from '../utils/network'


export function getRoutes() {
    return function (dispatch) {
        dispatch({
            type: RouteType.GET_ROUTES_REQUEST
        });
        makeRequest('', NetworkMethod.GET)
            .then((response) => {
                dispatch({
                    type: RouteType.GET_ROUTES_SUCCESS,
                    payload: response
                });
            })
            .catch(() => {
                dispatch({
                    type: RouteType.GET_ROUTES_FAIL
                });
            });
    }
}


export function getRouteDevices(routeId) {
    return function (dispatch) {
        dispatch({
            type: RouteType.GET_ROUTES_DEVICES_REQUEST,
            payload: routeId
        });
        makeRequest('', NetworkMethod.GET)
            .then((response) => {
                dispatch({
                    type: RouteType.GET_ROUTES_DEVICES_SUCCESS,
                    payload: response
                });
            })
            .catch(() => {
                dispatch({
                    type: RouteType.GET_ROUTES_DEVICES_FAIL
                })
            });
    }
}