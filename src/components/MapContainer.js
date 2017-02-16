/**
 * Created by Dmytro.Pavlenko on 16.02.2017.
 */

import React, {Component} from 'react'
import { Map ,TileLayer } from 'react-leaflet';

export class MapContainer extends Component{
    render(){
        const position = [ 50.2590105, 28.6464759];
        return(
            <div className="card text-center">
                <div className="card-header">
                    <small>Map View</small>
                </div>
                <div className="card-block">
                    <Map
                        style={{height: '400px'}}
                        center={position} zoom={13} >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                    </Map>
                </div>
            </div>
        )
    }
}



