/**
 * Created by Dmytro.Pavlenko on 15.02.2017.
 */
import React, {Component, PropTypes} from 'react'

export default class Page extends Component{

    onYearBtnClick(e){
        this.props.getPhotos(+e.target.innerText);
    }

    render(){
        const {year, photos, fetching, error} = this.props;
        const years = [2017,2016,2015,2014,2013, 2012];
        return(
            <div>
                {years.map((item, index) => <button key={index} onClick={::this.onYearBtnClick}>{item}</button>)}
                {error ? <p>Error {error}</p> : ''}
                <h3 className='year-header'>{year}</h3>
                {
                    fetching ?
                        <p>Loading ....</p>
                        :
                        photos.map((entry, index) => {
                           return <div key={index}>
                               <p><img src={entry.src}></img></p>
                               <p>Likes : {entry.likes.count}</p>
                           </div>
                        })
                }
            </div>
        )
    }
}

Page.propTypes = {
    year: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
    getPhotos: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
}