import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as routesActions from '../actions/RouteActions'
import Card from '../components/Card'

export class AddObservePoint extends Component {

    constructor() {
        super();
        this.state = {id: 123, selecting: false};
    }

    handleAddBtnClick() {
        const {addRoutePoint} = this.props.routesActions;
        const {observables} = this.props.routes;

        addRoutePoint({...this.state, observables: observables});
    }

    handleSelectingBtnClick() {
        const {selecting} = this.props.routesActions;
        selecting(!this.state.selecting);
        this.setState({selecting: !this.state.selecting});
    }

    handleFormInputs(e) {
        const controlName = e.target.name;
        const value = e.target.value;
        this.setState({[controlName]: value});
    }

    render() {
        return (
            <Card headerLabel="Add observe point">
                <div className="form-group row">
                    <label for="example-text-input" className="col-3 col-form-label">Label</label>
                    <div className="col-9">
                        <input className="form-control" type="text" name="label" onChange={::this.handleFormInputs}
                               id="example-text-input"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label for="example-search-input" className="col-3 col-form-label">Vibrate</label>
                    <div className="col-9">
                        <input className="form-control" type="search" name="vibrateDuration"
                               onChange={::this.handleFormInputs}
                               id="example-search-input"/>
                    </div>
                </div>
                <div id="point-actions" className="form-group">
                    <button className="btn btn-primary text-center"
                            onClick={::this.handleSelectingBtnClick}>{!this.state.selecting ? 'Add Observable Point' : 'Stop Selecting'}</button>
                    <button className="btn btn-primary text-center" onClick={::this.handleAddBtnClick}>Add</button>
                </div>
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
        routesActions: bindActionCreators(routesActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddObservePoint);