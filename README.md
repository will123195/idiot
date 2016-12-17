# idiot

A simple/lightweight/generic/dumb client for consuming a JSON REST API from the browser or Node.js

### Install

```
npm install --save idiot
```

### Usage

```js
const client = require('idiot')({
  baseUrl: 'http://localhost:8080/api'
})

// you can use promises
client.get('/movies')
.then(data => {
  // got a 2xx response
})
.catch(err => {
  // did not get a 2xx response
})

// or you can use good ol' callbacks
client.get('/movies', function (err, data) {
  if (err) {
    console.log('err:', err)
  }
  // we got a 2xx response
  console.log('data:', data)
})
```

### Documentation

#### new Idiot( options )
- options {Object}
    - baseUrl {String} (required) each request url is formed by appending the `uri` to this value
    - Promise {Function} (optional) specify your own Promise library

#### client.delete( uri, [query], [cb] )
- uri {String}
- query {Object} (optional) querystring values
- cb {Function} (optional) callback

#### client.get( uri, [query], [cb] )
- uri {String}
- query {Object} (optional) querystring values
- cb {Function} (optional) callback

#### client.patch( uri, body, [query], [cb] )
- uri {String}
- body {Object}
- query {Object} (optional) querystring values
- cb {Function} (optional) callback

#### client.post( uri, body, [query], [cb] )
- uri {String}
- body {Object}
- query {Object} (optional) querystring values
- cb {Function} (optional) callback

#### client.put( uri, body, [query], [cb] )
- uri {String}
- body {Object}
- query {Object} (optional) querystring values
- cb {Function} (optional) callback

#### client.request( options, [cb] )
- options
    - method
    - uri
    - body
    - query
    - aborter
- cb (optional)
