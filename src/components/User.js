/**
 * Created by Dmytro.Pavlenko on 15.02.2017.
 */
import React, {Component, PropTypes} from 'react'

export default class User extends  Component{

    onLoginBtnClicked(){
        this.props.handleLogin();
    }
    render(){
        const {name, error} = this.props;
        let template;

        if(name){
            template = <p>Hi, {name}</p>
        }else{
            template =  <button onClick={::this.onLoginBtnClicked}>Login</button>
        }
        return(
            <div>
                {template}
                {error ? <p>Error {error}</p> : ''}
            </div>
        )
    }
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    handleLogin: PropTypes.func.isRequired
}

