/**
 * Created by Dmytro.Pavlenko on 15.02.2017.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Page from '../components/Page'
import * as pageActions from '../actions/PageActions'


export class Home extends Component{
    render(){
        const {page} = this.props;
        const { getPhotos } = this.props.pageActions;
        return (
            <div>
                <Page year={page.year} photos={page.photos} getPhotos={getPhotos}  fetching={page.fetching} error={page.error} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        page: state.page
    }
}

function mapDispatchToProps(dispatch) {
    return{
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);