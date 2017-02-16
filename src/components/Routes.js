import React, {Component} from 'react'
import * as routesActions from '../actions/RouteActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

export class Routes extends Component {

    constructor(){
        super();
        this.state = {activeIndex: -1};
    }

    render() {
        let routes = [
            {
                id: 550,
                label: '1'
            },
            {
                id: 550,
                label: '1'
            },
            {
                id: 550,
                label: '1'
            },
            {
                id: 550,
                label: '1'
            }
        ];
        const {getRouteDevices} = this.props.routesAction;
        return (
            <div className="card text-center">
                <div className="card-header">
                    <small>Routes :</small>
                </div>
                <div className="card-block">
                    <div className="list-group list-group-flush">
                        {routes.map((item, index) => <button
                            className={'list-group-item list-group-item-action ' + (this.state.activeIndex === index ? 'active' : '')}
                            key={index}
                            onClick={() => {
                                this.setState({activeIndex: index});
                                getRouteDevices(item.id);
                               // this.onYearBtnClick(e);
                            }}>{item.label}</button>)}
                    </div>
                </div>
            </div>
        )
    }
}

 function mapStateToProps(state){
    return {
        devices: state.devices
    }
}

 function mapDispatchToProps(dispatch){
    return{
        routesAction: bindActionCreators(routesActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);