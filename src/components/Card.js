/**
 * Created by Dmytro.Pavlenko on 20.02.2017.
 */
import React, {Component, PropTypes} from 'react'


export default class Card extends Component {

    render() {
        const {headerLabel} = this.props;
        return (
            <div className="card">
                <div className="card-header">
                    <small>{headerLabel}</small>
                </div>
                <div className="card-block">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

Card.propTypes = {
    headerLabel: PropTypes.string.isRequired
}