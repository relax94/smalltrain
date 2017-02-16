/**
 * Created by Dmytro.Pavlenko on 15.02.2017.
 */
import React, {Component, PropTypes} from 'react'

export default class User extends Component {

    onLoginBtnClicked() {
        this.props.handleLogin();
    }

    render() {
        const {name} = this.props;
        let template;

        if (name) {
            template = <p>Hi, {name}</p>
        } else {
            template = <button className="btn btn-success my-2 my-sm-0" onClick={::this.onLoginBtnClicked}>
                Login</button>
        }
        return template
    }
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    handleLogin: PropTypes.func.isRequired
}

