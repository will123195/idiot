var test = require('tape');

var Idiot = require('./index');
var client = Idiot({
  baseUrl: 'https://graph.facebook.com',
  Promise: require('es6-promise-polyfill').Promise
});

test('fb promise', function (t) {
  client.get('/')
  .catch(function (err) {
    t.ok(err);
    t.ok(err.message);
    t.end();
  });
});

test('fb callback', function (t) {
  client.get('/', function (err, data) {
    t.ok(err);
    t.ok(err.message);
    t.end();
  });
});
