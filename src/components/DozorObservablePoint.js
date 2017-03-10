import React, {Component, PropTypes} from 'react'

export class DozorObservablePoint extends Component {


    applyAddingObservablePoint() {
        const {updateObservablePoint} = this.props.routeActions;
        updateObservablePoint(this.props.index, {
            ...this.props.item,
            label: this.state.label,
            duration: this.state.duration
        });
    }

    handlePointDetailsChanges(e) {
        const controlName = e.target.name;
        const value = e.target.value;
        this.setState({[controlName]: value});
    }

    removePointBtnClick() {
        const {removeObservablePoint} = this.props.routeActions;
        removeObservablePoint(this.props.index);
    }

    render() {
        const {item, index, isAlert} = this.props;
        return (

            <div key={index} className="card">
                <div className="card-header" role="tab" id={'heading' + index}>
                    <h5 className="mb-0">
                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion"
                           href={'#collapse' + index}
                           aria-expanded="false" aria-controls="collapseThree">
                            Point# {item.label || item.lat}
                        </a>
                        {isAlert ? <span className="custom-alert">Active</span> : ''}
                    </h5>
                </div>
                <div id={'collapse' + index} className="collapse" role="tabpanel" aria-labelledby={'heading' + index}>
                    <div className="card-block">
                        <div className="row">
                            <div className="col-md-4">
                                <input placeholder="Point Label" type="text" name="label" className="form-control"
                                       onChange={::this.handlePointDetailsChanges}/>
                            </div>
                            <div className="col-md-4">
                                <input placeholder="Vibration Duration" type="text" name="duration"
                                       className="form-control"
                                       onChange={::this.handlePointDetailsChanges}/>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary" onClick={::this.applyAddingObservablePoint}>OK
                                </button>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-danger" onClick={::this.removePointBtnClick}>Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

DozorObservablePoint.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    isAlert: PropTypes.bool.isRequired,
    routes: PropTypes.object.isRequired,
    routeActions: PropTypes.object.isRequired
}
