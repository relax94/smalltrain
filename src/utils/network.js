import * as $ from 'jquery'
import Promise from 'promise'

export function makeRequest(requestUrl, method, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: method,
            url: requestUrl,
            data: data,
            success: resolve,
            error: reject,
            dataType: 'json'
        });
    });
}