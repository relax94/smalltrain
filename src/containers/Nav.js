import React, {Component} from 'react'
import User from '../components/User'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userActions from '../actions/UserActions'
import {Link} from 'react-router'

export class Nav extends Component {
    render() {
        const {user} = this.props;
        const {handleLogin} = this.props.userActions;
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
                <a className="navbar-brand" href="#">Traveler</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/about'>About</Link>
                        </li>
                        <li className="nav-item">
                            <User name={user.name} handleLogin={handleLogin} error={user.error}/>
                        </li>

                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);