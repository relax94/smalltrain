import React, {Component, PropTypes} from 'react'


export class AddObservePoint extends Component {

    constructor() {
        super();
        this.state = {id: 123};
    }

    handleAddBtnClick(){
        this.props.addObservePoint(this.state);
    }

    handleFormInputs(e) {
        const controlName = e.target.name;
        const value = e.target.value;
        this.setState({[controlName]: value});
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <small>Add observe point</small>
                </div>
                <div className="card-block">
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
                    <div className="form-group row">
                        <label for="example-email-input" className="col-3 col-form-label">Email</label>
                        <div className="col-9">
                            <input className="form-control" type="email" value=""
                                   id="example-email-input"/>
                        </div>
                    </div>
                    <div className="form-group row col-4 offset-4">
                        <button className="btn btn-primary text-center" onClick={::this.handleAddBtnClick}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

AddObservePoint.propTypes = {
    addObservePoint: PropTypes.func.isRequired
}