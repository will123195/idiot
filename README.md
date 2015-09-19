# idiot
Dumb client for REST APIs

### Install

```
npm install --save idiot
```

### Usage

```js
var client = require('idiot')({
  baseUrl: 'http://localhost:8080/api'
})
client.get('/movies', function (statusCode, data) {
  console.log('data:', data)
})
```
