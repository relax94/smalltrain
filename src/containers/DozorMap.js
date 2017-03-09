/**
 * Created by Dmytro.Pavlenko on 16.02.2017.
 */

import React, {Component} from 'react'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import * as L from 'leaflet'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as routeActions from '../actions/RouteActions'
import Card from '../components/Card'
import {DozorObservablePoint} from '../components/DozorObservablePoint'


export class DozorMap extends Component {

    constructor() {
        super();
        this.state = {observables: []};
    }

    componentDidMount() {
        const {getRouteDevices} = this.props.routeActions;
        getRouteDevices(111);
    }

    handleMapClick(e) {
        const {isSelectingObservables} = this.props.routes;
        if (isSelectingObservables) {
            const {addObservablePoint} = this.props.routeActions;
            addObservablePoint({
                lat: e.latlng.lat,
                lng: e.latlng.lng,
                loc: e.latlng
            });
        }
    }


    render() {
        const position = [50.2590105, 28.6464759];
        const {devices, checkpointAlerts, observables} = this.props.routes;
/*        const {observables} = this.state;*/
        const markers =
            (devices.map(device => device.map(bus => <Marker position={bus.loc} icon={
                    L.divIcon({
                        className: 'dozor-point-marker',
                        iconSize: [50, 50]
                    })
                }>
                    <Popup children={<p>{bus.gNb}</p>}/>
                </Marker>))
            );

        const observableMarkers = (
            observables.map((point) =>
                <Marker position={point.loc} icon={
                    L.divIcon({
                        className: 'observable-marker',
                        iconSize: [50, 50]
                    })
                }>
                    <Popup children={<p>{point.lat}</p>}/>
                </Marker>));


        return (
            <Card headerLabel={'Map View'}>
                <Map
                    ref='map'
                    style={{height: '400px'}}
                    center={position} zoom={13}
                    onClick={::this.handleMapClick}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    {markers}
                    {observableMarkers}
                </Map>
                <ul className="list-group">
                    {observables.map((item, index) =>
                        <DozorObservablePoint routes={this.props.routes} routeActions={this.props.routeActions} item={item} index={index} isAlert={checkpointAlerts.find(a => a.observerId === index)}/>
                    )}
                </ul>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        routes: state.routes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routeActions: bindActionCreators(routeActions, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(DozorMap);


