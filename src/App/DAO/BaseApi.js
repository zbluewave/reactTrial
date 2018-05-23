import httpErrorModelFactory from 'FSL/modules-react/Base/Model/httpErrorModelFactory';
import Settings from 'FSL/modules-react/Base/Config/Settings';

function request(url, data) {
    return fetch(url, data);
}

function formatQuery(obj) {

    return Object.keys(obj)
        .map(k => {
            if (Array.isArray(obj[k])) {
                return obj[k].map(arrayVal => `${encodeURIComponent(`${k}[]`)}=${encodeURIComponent(arrayVal)}`).join('&');
            } else if (typeof obj[k] !== "undefined") {
                return `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`;
            }
        })
        .join('&');
}

function generateQuery(query) {
    return {
        ...(query || {}),
        client_id: Settings.CLIENT_ID
    };
}

function generateData({ method, headers, body, generator }) {
    var authToken = generator && generator();
    var data = {
        method: method || 'get',
        headers: {
            'Accept': 'application/json',
            ...(headers || {}),
            ...(authToken || {})
        }
    };

    if (body) {
        data.body = JSON.stringify(body);
        data.headers['Content-Type'] = 'application/json';
    }

    return data;
}

class BaseApi {

	/**
	 * The logger should be a function that excepts an unlimited number of arguments
	 * It will be called on api requests, success responses, and error responses with information on each
	 * e.g.
	 * BaseApi.setLogger(function () {
	 *     const args = Array.prototype.slice.call(arguments);
	 *     logThisInformationSomewhere(args);
	 * });
	 */
    static setLogger(logger) {
        this.logger = logger;
    }

    static log() {
        if (this.logger) {
            this.logger.apply(this, arguments);
        }
    }

    static setHeaderGenerator(generator) {
        this.generator = generator;
    }

    static setOnFetchErrorCallback(onErrorCallback) {
        this.onFetchErrorCallback = onErrorCallback;
    }

    static fetch({ url, query, method, headers, body }) {
        var qs = formatQuery(generateQuery(query));
        var data = generateData({
            method,
            headers,
            body,
            generator: this.generator
        });
        url = `${Settings.API_BASE_URL}/${url}?${qs}`;
        this.log('Fetch request', url, data);
        return request(url, data)
            .then(response => BaseApi.parseResponse(response, url));
    }

    static parseResponse(response, url) {
        var body = response.status === 204 ? response.text() : response.json();
        if (response.status >= 200 && response.status < 300) {
            BaseApi.log('Fetch 200 response', url);
            return body;
        } else {
            return body.then(errorObject => {
                errorObject.status = response.status;
                errorObject.url = url;
                const errorModel = httpErrorModelFactory(errorObject);
                BaseApi.log('Fetch API Error', errorModel);

                if (this.onFetchErrorCallback) {
                    this.onFetchErrorCallback(errorModel);
                }

                throw errorModel;
            });
        }
    }

}

export default BaseApi;
