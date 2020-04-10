const axios = require('axios').default;
const querystring = require('querystring');
class CafeBazaar {
    constructor(client_id, client_secret, refresh_token, package_name) {
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.refresh_token = refresh_token;
        this.package_name = package_name;
    }

    get_refresh_token = () => new Promise((resolve, reject) => {
        axios({
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: 'https://pardakht.cafebazaar.ir/devapi/v2/auth/token/',
            data: querystring.stringify({
                grant_type: 'refresh_token',
                client_id: this.client_id,
                client_secret: this.client_secret,
                refresh_token: this.refresh_token
            })
        })
            .then(res => {
                return resolve(res.data.access_token);
            })
            .catch(err => {
                return reject(err);
            })
    });
    validate = (sku, token) => new Promise(async (resolve, reject) => {
        try {
            let auth = await this.get_refresh_token();
            axios({
                method: 'get',
                url: `https://pardakht.cafebazaar.ir/devapi/v2/api/validate/${this.package_name}/inapp/${sku}/purchases/${token}/?access_token=${auth}`
            })
                .then(response => {
                    let ret = {
                        status: response.status,
                        data: response.data
                    };
                    return resolve(ret);
                })
                .catch(err => {
                    let ret = {
                        status: err.response.status,
                        data: err.response.data
                    };
                    return resolve(ret);
                })
        } catch (err) {
            return resolve(err);
        }

    });
}

module.exports = (client_id, client_secret, refresh_token, package_name) => new CafeBazaar(client_id, client_secret, refresh_token, package_name);