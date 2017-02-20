/**
 * Created by Dmytro.Pavlenko on 16.02.2017.
 */

import React, {Component} from 'react'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import * as L from 'leaflet'
import {connect} from 'react-redux';
import FirebaseService from '../services/FirebaseService'
import {bindActionCreators} from 'redux'
import * as routeActions from '../actions/RouteActions'
import Card from '../components/Card'

export class DozorMap extends Component {
    constructor() {
        super();
        this.fs = new FirebaseService();
        this.state = {devices: [[]], observables: []};
    }

    componentDidMount() {
        this.fs.subscribe('dozor', this.setDevices.bind(this));
    }

    setDevices(dozorDevices) {
        const devices = Object.values(dozorDevices);
        this.setState({devices});
    }

    handleMapClick(e) {
        const {isSelectingObservables} = this.props.routes;
        if (isSelectingObservables) {
            let extended = this.state.observables;
            extended.push({lat: e.latlng.lat, lng: e.latlng.lng, loc: e.latlng});
            this.setState({observables: extended});

            const {addObservablePoint} = this.props.routeActions;
            addObservablePoint(extended);
        }
    }

    render() {
        const position = [50.2590105, 28.6464759];
        const {devices, observables} = this.state;
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
            observables.map((point) => <Marker position={point.loc} icon={
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
                        <li className="list-group-item justify-content-between">
                            Point#{++index}
                            <span className="badge badge-default badge-pill">X</span>
                        </li>
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


