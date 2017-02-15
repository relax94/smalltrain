/**
 * Created by Dmytro.Pavlenko on 15.02.2017.
 */
import {GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAIL} from '../constants/Page'
import VK from 'vk-openapi';

VK.init({
    apiId: 5876835
});

let photosCollection = [];
let cached = false;

function makeYearPhotos(photos, selectedYear) {
    let createdYear, yearPhotos = [];

    photos.forEach((item) => {
        createdYear = new Date(item.created * 1000).getFullYear();
        if (createdYear === selectedYear) {
            yearPhotos.push(item);
        }
    })

    yearPhotos.sort((a, b) => b.likes.count - a.likes.count);

    return yearPhotos;
}

function getMorePhotos(offset, count, year, dispatch) {
    VK.Api.call('photos.getAll', {extended: 1, count: count, offset: offset}, (r) => {
        console.log('response ', r);
        try {
            if (offset < r.response[0]) {
                offset += r.response[0];
                photosCollection = photosCollection.concat(r.response);
                getMorePhotos(offset, count, year, dispatch);
            } else {
                let photos = makeYearPhotos(photosCollection, year);
                cached = true;
                dispatch({
                    type: GET_PHOTOS_SUCCESS,
                    payload: photos
                });
            }
        }
        catch (e) {
            dispatch({
                type: GET_PHOTOS_FAIL,
                error: true,
                payload: {message: new Error(e)}
            });
        }
    });
}

export function getPhotos(year) {
    return (dispatch) => {
        dispatch({
            type: GET_PHOTOS_REQUEST,
            payload: year
        });

        if (cached) {
            let photos = makeYearPhotos(photosCollection, year);
            dispatch({
                type: GET_PHOTOS_SUCCESS,
                payload: photos
            });
        } else {
            getMorePhotos(0, 5, year, dispatch);
        }

    }
}