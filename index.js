var xhr = require('xhr');
var xhr2 = require('xhr2');
var querystring = require('querystring');

var Client = module.exports = function Client (opts) {
  if (!(this instanceof Client)) {
    return new Client(opts);
  }
  opts = opts || {};
  this.baseUrl = opts.baseUrl || '';
  this.headers = {
    'Content-Type': 'application/json'
  };
  if (opts.accessToken) {
    this.headers['x-access-token'] = opts.accessToken;
  }
  this.Promise = opts.Promise;
  if (!this.Promise && typeof Promise !== 'undefined') {
    this.Promise = Promise;
  }
};

if (typeof window !== 'undefined') {
  window.WineClient = Client;
}

////// utility methods //////

Client.prototype.setAccessToken = function (token) {
  this.headers['x-access-token'] = token;
  if (!token) {
    delete this.headers['x-access-token']
  }
};

Client.prototype.send = function (opts, cb) {
  var self = this;
  var headers = {};
  Object.keys(self.headers).forEach(function (key) {
    return headers[key] = self.headers[key];
  });
  if (opts.accessToken) {
    headers['x-access-token'] = opts.accessToken;
  }
  var qs = '';
  if (opts.query) {
    qs = '?' + querystring.stringify(opts.query);
  }
  var httpRequest = xhr({
    method: opts.method.toUpperCase(),
    uri: self.baseUrl + opts.uri + qs,
    headers: headers,
    json: opts.body,
    xhr: new xhr2()
  }, function (err, resp, body) {
    if (err) {
      return cb(err);
    }
    self.statusCode = resp.statusCode;
    var ok = [200, 201, 202, 203, 204, 205, 206];
    if (ok.indexOf(resp.statusCode) === -1) {
      return cb((body && body.error) || body || resp.statusCode);
    }
    cb(null, body);
  });
  if(opts.aborter) {
    opts.aborter.then(httpRequest.abort);
  }
};

Client.prototype.resolver = function () {
  var Promise = this.Promise;
  if (!Promise) {
    throw new Error('No callback provided and no Promise library specified.');
  }
  var resolver;
  var promise = new Promise(function (resolve, reject) {
    resolver = function (err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    }
  });
  resolver.promise = promise;
  return resolver;
};

Client.prototype.request = function (opts, cb) {
  cb = cb || this.resolver();
  this.send({
    method: opts.method,
    uri: opts.uri,
    body: opts.body,
    query: opts.query,
    aborter: opts.aborter
  }, function (err, body) {
    if (err) return cb(err);
    var result = opts.result ? body[opts.result] : body;
    cb(null, result);
  });
  return cb.promise ? cb.promise : this;
};

Client.prototype.delete = function (uri, query, cb) {
  if (typeof query === 'function') {
    cb = query;
    query = {};
  }
  return this.request({
    method: 'delete',
    uri: uri,
    query: query
  }, cb);
};


Client.prototype.get = function (uri, query, cb) {
  if (typeof query === 'function') {
    cb = query;
    query = {};
  }
  return this.request({
    method: 'get',
    uri: uri,
    query: query
  }, cb);
};

Client.prototype.patch = function (uri, body, query, cb) {
  if (typeof query === 'function') {
    cb = query;
    query = {};
  }
  return this.request({
    method: 'patch',
    uri: uri,
    body: body,
    query: query
  }, cb);
};

Client.prototype.post = function (uri, body, query, cb) {
  if (typeof query === 'function') {
    cb = query;
    query = {};
  }
  return this.request({
    method: 'post',
    uri: uri,
    body: body,
    query: query
  }, cb);
};

Client.prototype.put = function (uri, body, query, cb) {
  if (typeof query === 'function') {
    cb = query;
    query = {};
  }
  return this.request({
    method: 'put',
    uri: uri,
    body: body,
    query: query
  }, cb);
};
