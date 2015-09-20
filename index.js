var request = require('client-request')
var querystring = require('querystring')

// opts.baseUrl
// opts.ext
// opts.querystring
var idiot = module.exports = function (opts) {
  if (!(this instanceof idiot)) {
    return new idiot(opts)
  }

  this.baseUrl = opts.baseUrl
}

idiot.prototype.get = function (resource, opts, cb) {
  this.run('get', resource, opts, cb)
}

idiot.prototype.post = function (resource, opts, cb) {
  this.run('post', resource, opts, cb)
}

idiot.prototype.put = function (resource, opts, cb) {
  this.run('put', resource, opts, cb)
}

idiot.prototype.delete = function (resource, opts, cb) {
  this.run('delete', resource, opts, cb)
}

// opts.query
// opts.body
idiot.prototype.run = function (method, resource, opts, cb) {
  var self = this
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  var query = opts.query || {}
  var url = self.baseUrl + resource
  if (Object.keys(query).length > 0) {
    url += '?' + querystring.stringify(query)
  }
  var options = {
    uri: url,
    method: method.toUpperCase()
  }
  if (opts.body) {
    options.body = opts.body
  }
  request(options, function (error, response, body) {
    if (error) {
      return cb(500, error)
    }
    try {
      var data = JSON.parse(body)
    } catch (e) {
      console.log(e)
      data = {}
    }
    cb(response.statusCode, data)
  })
}
