/**
 * Created by Dmytro.Pavlenko on 16.02.2017.
 */

import React, {Component} from 'react'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import {connect} from 'react-redux'
/*import {bindActionCreators} from 'redux'*/

export class DozorMap extends Component {
    render() {
        const position = [50.2590105, 28.6464759];
        const markerPosition = [50.2590105, 28.6464759];
        const {devices} = this.props.routes;
        return (
            <div className="card text-center">
                <div className="card-header">
                    <small>Map View</small>
                </div>
                <div className="card-block">
                    {devices.map(device => <p>{device}</p>)}
                    <Map
                        style={{height: '400px'}}
                        center={position} zoom={13}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        <Marker
                            position={markerPosition}
                            ref='marker'>
                            <Popup minWidth={90}>
                            </Popup>
                        </Marker>
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


