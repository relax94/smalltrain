/**
 * Created by Dmytro.Pavlenko on 15.02.2017.
 */
import React, {Component, PropTypes} from 'react'
import Images from '../containers/Images'
import DozorMap from '../containers/DozorMap'
import Routes from '../containers/Routes'
import AddObservePoint from '../containers/AddObservePoint'

const inlineContainerStyles = {
    marginTop: '15px'
}

export default class Page extends Component {

    constructor() {
        super();
        this.state = {activeIndex: -1};
    }

    onYearBtnClick(e) {
        this.props.getPhotos(+e.target.innerText);
    }

    render() {
        const {year, photos, fetching, error} = this.props;
        const years = [2017, 2016];
        return (
                <div className="row" style={inlineContainerStyles}>
                    <div className="col-md-4">
                        <div className="card w-100 text-center">
                            <div className="card-header">
                                <small className="text-muted">Travel Photos</small>
                            </div>
                            <div className="card-block">
                                <div className="list-group list-group-flush">
                                    {years.map((item, index) => <button
                                        className={'list-group-item list-group-item-action ' + (this.state.activeIndex === index ? 'active' : '')}
                                        key={index}
                                        onClick={(e) => {
                                            this.setState({activeIndex: index});
                                            this.onYearBtnClick(e);
                                        }}>{item}</button>)}
                                </div>
                            </div>
                        </div>
                        <Routes/>
                        <AddObservePoint/>
                        {error ? <p>Error {error}</p> : ''}

                    </div>
                    <div className="col-md-8">
                        <div className="card text-center">
                            <div className="card-header">
                                <small className="text-muted">{year}</small>
                            </div>
                            <div className="card-block">
                                {
                                    fetching ? <p>Loading ....</p>
                                        : <Images photos={photos}/>
                                }
                            </div>
                        </div>
                        <DozorMap/>
                    </div>
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
