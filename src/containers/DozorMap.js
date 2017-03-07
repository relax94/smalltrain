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
        this.setState({
            observables: this.state.observables.concat({
                lat: e.latlng.lat,
                lng: e.latlng.lng,
                loc: e.latlng
            })
        });
    }

    applyAddingObservablePoint(observableId) {
        const {isSelectingObservables} = this.props.routes;
        if (isSelectingObservables) {
            const {addObservablePoint} = this.props.routeActions;
            addObservablePoint({
                ...this.state.observables[observableId],
                label: this.state.label,
                duration: this.state.duration
            });
        }
    }

    handlePointDetailsChanges(e) {
        const controlName = e.target.name;
        const value = e.target.value;
        this.setState({[controlName]: value});
    }

    removePointFromLocalState(index) {
        this.setState({
            observables: this.state.observables.filter((el, it) => it !== index)
        });
    }

    removePointBtnClick(index) {
        this.removePointFromLocalState(index);
        const {removeObservablePoint} = this.props.routeActions;
        removeObservablePoint(index);
    }

    render() {
        const position = [50.2590105, 28.6464759];
        const {devices, checkpointAlerts} = this.props.routes;
        const {observables} = this.state;
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

                        <li key={index}
                            className={'list-group-item justify-content-between ' + (checkpointAlerts.find(a => a.observerId === index) ? 'active' : '')}
                        >
                            Point# {item.lat}
                            <div className="row">
                                <div className="col-md-4">
                                    <input type="text" name="label" className="form-control"
                                           onChange={::this.handlePointDetailsChanges}/>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" name="duration" className="form-control"
                                           onChange={::this.handlePointDetailsChanges}/>
                                </div>
                                <div className="col-md-2">
                                    <button className="btn btn-primary" onClick={() => {
                                        this.applyAddingObservablePoint(index);
                                    }}>OK
                                    </button>
                                </div>
                                <div className="col-md-2">
                                    <button className="btn btn-danger" onClick={() => {
                                        this.removePointBtnClick(index);
                                    }}>Remove
                                    </button>
                                </div>
                            </div>
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


