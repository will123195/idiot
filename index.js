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

idiot.prototype.get = function (resource, query, cb) {
  var self = this
  if (typeof query === 'function') {
    cb = query
    query = {}
  }

  var url = self.baseUrl + resource
  if (Object.keys(query).length > 0) {
    url += '?' + querystring.stringify(query)
  }
  request({
    uri: url,
    method: 'GET'
  }, function (error, response, body) {
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
