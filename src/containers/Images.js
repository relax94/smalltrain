/**
 * Created by Dmytro.Pavlenko on 15.02.2017.
 */
import React, {Component, PropTypes} from 'react'
import ImageItem from '../components/ImageItem'
import Modal from 'react-modal';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as imagesAction from '../actions/ImagesActions'


const modalStyles = {
    content: {
        height: '200px',
        width: '200px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export class Images extends Component {
    render() {
        const {photos, images} = this.props;
        const {updateUserAvatar} = this.props.imagesAction;
        return (

            <div className="images-container">
                {photos.map((entry, index) => {
                    return <ImageItem key={index} index={index} source={entry.src} handleImageItemClick={updateUserAvatar}/>
                })}
                <Modal
                    isOpen={images.isOpenModal}
                    contentLabel="Example Modal"
                    style={modalStyles}
                />
            </div>
        )
    }
}

Images.propTypes = {
    photos: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
    return{
        images: state.images
    }
}

function mapDispatchToProps(dispatch) {
    return{
        imagesAction: bindActionCreators(imagesAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Images);
