import * as RouteType from '../constants/Dozor'
/*import {NetworkMethod} from '../constants/Network'
import {makeRequest} from '../utils/network'*/


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
       /* makeRequest('', NetworkMethod.GET)
            .then((response) => {*/
                dispatch({
                    type: RouteType.GET_ROUTES_DEVICES_SUCCESS,
                    payload: ['device1', 'device2']
                });
         /*   })
            .catch((err) => {
                dispatch({
                    type: RouteType.GET_ROUTES_DEVICES_FAIL,
                    payload: err
                })
            });*/
    }
}

export function addRoutePoint(){
    return function (dispatch) {
        dispatch({
            type: RouteType.ADD_ROUTE_POINT
        });
    }
}