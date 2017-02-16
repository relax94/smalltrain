
import {SHOW_IMAGES, SHOW_SELECTED_IMAGE} from '../constants/ImagesActions'

const initialState = {
    photos: [],
    isOpenModal: false
}

export default function images(state = initialState, action) {
    switch (action.type){
        case SHOW_IMAGES:
            return {...state, photos: action.payload};
        case SHOW_SELECTED_IMAGE:
            return {...state, isOpenModal: true};
        default:
            return state;
    }
}
