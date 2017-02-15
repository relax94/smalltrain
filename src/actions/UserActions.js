/**
 * Created by Dmytro.Pavlenko on 15.02.2017.
 */

import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL} from '../constants/User'
import VK from 'vk-openapi';

VK.init({
    apiId: 5876835
});

export function handleLogin() {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });

        VK.Auth.login((r) => {
            if (r.session) {
                let username = r.session.user.first_name;

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: username
                });
            } else {
                dispatch({
                    type: LOGIN_FAIL,
                    error: true,
                    payload: {message: new Error('Authorization error')}
                });
            }
        }, 4)
    }
}
