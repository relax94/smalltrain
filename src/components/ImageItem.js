import React, {Component, PropTypes} from 'react'


export  default class ImageItem extends Component {

    handleImageClick(){
        this.props.handleImageItemClick();
    }

    render(){
        const {index, source} = this.props;
        return (
            <div key={index} className="image-item-container" onClick={::this.handleImageClick}>
                <img className="image-item" src={source}></img>
            </div>
        )
    }
}

ImageItem.propTypes = {
    index: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    handleImageItemClick: PropTypes.func.isRequired
}