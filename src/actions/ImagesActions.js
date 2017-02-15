
import {SHOW_IMAGES, SHOW_SELECTED_IMAGE} from '../constants/ImagesActions'
import {UPDATE_USER_AVATAR} from '../constants/User'

export function showImages(photos) {
    return function (dispatch) {
        dispatch({
            type: SHOW_IMAGES,
            payload: photos
        });
    }
}

export function showSelectedImage() {
    return function (dispatch) {
        dispatch({
            type: SHOW_SELECTED_IMAGE
    })
    }
}

export function updateUserAvatar() {
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_AVATAR
        })
    }
}