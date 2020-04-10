# Cafebazaar Validation
A simple npm module for validate https://cafebazaar.ir/ payments

## Installation
This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).
Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install cafebazaar_validation
```


## Instantiate module
```js
const cafebazaar = require('cafebazaar_validation')(client_id, client_secret, refresh_token, package_name);
```

Example:
```js
const cafebazaar = require('cafebazaar_validation')(
    'client_id',
    'client_secret',
    'refresh_token',
    'package_name'
);
```

## Validate Payment
```js
let res = await cafebazaar.validate(sku, token);
```


Success Example:

```json
{
  "status": 200,
  "data": {
    "consumptionState": 0,
    "purchaseState": 0,
    "kind": "androidpublisher#inappPurchase",
    "developerPayload": "",
    "purchaseTime": 1586530039266
  }
}
```

Error Example:
```json
{
  "status": 404,
  "data": {
    "error_description": "The requested purchase is not found!",
    "error": "not_found"
  }
}
```