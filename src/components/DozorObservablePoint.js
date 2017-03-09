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
            <li key={index}
                className={'list-group-item justify-content-between ' + (isAlert ? 'active' : '')}
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
                        <button className="btn btn-primary" onClick={::this.applyAddingObservablePoint}>OK
                        </button>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-danger" onClick={::this.removePointBtnClick}>Remove
                        </button>
                    </div>
                </div>
            </li>
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
