import React, {Component} from 'react'


export class AddObservePoint extends Component {
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
                            <input className="form-control" type="text" value="" id="example-text-input"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="example-search-input" className="col-3 col-form-label">Vibrate</label>
                        <div className="col-9">
                            <input className="form-control" type="search" value=""
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
                        <button className="btn btn-primary text-center">Add</button>
                    </div>
                </div>
            </div>
        )
    }
}