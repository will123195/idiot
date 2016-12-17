# idiot

A simple JSON REST client

- Lightweight for the browser and Node.js
- Supports Promises and callbacks

[![Build Status](https://travis-ci.org/will123195/idiot.svg?branch=master)](https://travis-ci.org/will123195/idiot)

### Install

```
npm install --save idiot
```

### Usage

```js
const client = require('idiot')({
  baseUrl: 'http://localhost:8080/api'
});

return client.get('/movies').then(data => {
  // got a 2xx response from http://localhost:8080/api/movies
});
```

### Documentation

#### `new Idiot( options )`
- `options` {Object}
    - `baseUrl` {String} (required) each request url is formed by appending the `uri` to this value
    - `Promise` {Function} (optional) specify your own Promise library

#### `client.delete( uri, [query], [cb] )`
- `uri` {String}
- `query` {Object} (optional) querystring values
- `cb` {Function} (optional) callback

#### `client.get( uri, [query], [cb] )`
- `uri` {String}
- `query` {Object} (optional) querystring values
- `cb` {Function} (optional) callback

#### `client.patch( uri, body, [query], [cb] )`
- `uri` {String}
- `body` {Object}
- `query` {Object} (optional) querystring values
- `cb` {Function} (optional) callback

#### `client.post( uri, body, [query], [cb] )`
- `uri` {String}
- `body` {Object}
- `query` {Object} (optional) querystring values
- `cb` {Function} (optional) callback

#### `client.put( uri, body, [query], [cb] )`
- `uri` {String}
- `body` {Object}
- `query` {Object} (optional) querystring values
- `cb` {Function} (optional) callback

#### `client.request( options, [cb] )`
- `options`
    - `method`
    - `uri`
    - `body`
    - `query`
    - `aborter`
- `cb` (optional)
