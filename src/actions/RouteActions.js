import * as $ from 'jquery'

export function getRouteDevices(routeId) {
    return function (dispatch) {
        document.cookie = 'gts.web.uuid=550588BB-E26A-4D5D-A501-2801EC2D30BD; gts.web.route.search.types=0,0,0,0,0; gts.web.city=zhytomyr; gts.web.google_map.center.lon=50.254023; gts.web.google_map.center.lat=28.662694; gts.web.google_map.zoom=13';
        $.get('https://city.dozor.tech/data?t=2&p=740,550', function( data ) {
          console.log('response ', data);
        });
        dispatch({
            type: 'GET_ROUTE_DEVICES',
            payload: routeId
        });
    }
}