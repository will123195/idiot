var request = require('request')
var querystring = require('querystring')
var merge = require('deep-extend')

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
  opts = opts || {}
  cb = cb || function () {}
  var i = resource.indexOf('?')
  var query = {}
  if (i > -1) {
    query = querystring.parse(resource.substring(i + 1))
    resource = resource.substring(0, i)
  }
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  merge(query, opts.query)
  var url = self.baseUrl + resource
  if (Object.keys(query).length > 0) {
    url += '?' + querystring.stringify(query)
  }
  var options = {
    uri: url,
    method: method.toUpperCase()
  }
  if (opts.body) {
    options.json = opts.body
  }
  request(options, function (error, response, body) {
    if (error) {
      return cb(500, error)
    }
    try {
      var data = JSON.parse(body)
    } catch (e) {
      data = body
    }
    cb(response.statusCode, data)
  })
}
