const initialRoute = {
    routes: [],
    devices: [],
    error: '',
    fetching: false
}

export default function routes(state = initialRoute, action) {
    switch (action.type) {
        case 'GET_ROUTE_DEVICES_SUCCESS':
            return {...state, devices: action.payload.data[0]['dvs']};
        case 'GET_ROUTE_DEVICES_REQUEST':
            return {...state, fetching: true};
        default:
            return state;

    }
}