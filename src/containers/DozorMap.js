/**
 * Created by Dmytro.Pavlenko on 16.02.2017.
 */

import React, {Component} from 'react'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import * as L from 'leaflet'
import {connect} from 'react-redux';
import FirebaseService from '../services/FirebaseService'
/*import {bindActionCreators} from 'redux'*/

export class DozorMap extends Component {
    constructor() {
        super();
        this.fs = new FirebaseService();
        this.state = {devices: [[]]};
    }

    componentDidMount() {
        this.fs.subscribe('dozor', this.setDevices.bind(this));
    }

    setDevices(dozorDevices) {
        const devices = Object.values(dozorDevices);
        console.log('DEV ', devices);
        this.setState({devices});
    }

    render() {
        const position = [50.2590105, 28.6464759];
       // const markerPosition = [50.2590105, 28.6464759];
        /*   const {devices} = this.props.routes;*/
        const {devices} = this.state;
        const markers =
            (devices.map(device => device.map(bus => <Marker position={bus.loc} icon={
                L.divIcon({
                    className: 'my-div-icon',
                    iconSize: [50,50]
                })
                }>
                    <Popup children={<p>{bus.gNb}</p>} />
                </Marker>))
            );
        return (

            <div className="card text-center">
                <div className="card-header">
                    <small>Map View</small>
                </div>
                <div className="card-block">
                    {/*       {devices.map(device => device.map(bus => <p>{bus.gNb}</p>))}*/}
                    <Map
                        style={{height: '400px'}}
                        center={position} zoom={13}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                       {/* <Marker
                            position={markerPosition}
                            ref='marker'>
                            <Popup minWidth={90}>
                            </Popup>
                        </Marker>*/}
                        {markers}
                    </Map>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        routes: state.routes
    }
}

export default connect(mapStateToProps)(DozorMap);


