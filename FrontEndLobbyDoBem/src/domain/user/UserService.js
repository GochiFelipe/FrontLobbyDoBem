import Axios from 'axios'
var querystring = require('querystring')

function getHostName (url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2]
  } else {
    return null
  }
}

var urlDev = 'http://' + getHostName(window.location.href) + ':8081'
const tokenUser = JSON.parse(localStorage.getItem('userAuth'))

export default class UserService {
  login (user) {
    return Axios.post(urlDev + '/oauth/token', querystring.stringify({
      username: user.username,
      password: user.password,
      grant_type: 'password'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: 'devglan-client',
        password: 'devglan-secret',
        grant_type: 'password'
      }
    })
  }
  findByEmail (email) {
    return Axios.get(urlDev + '/users/' + email, {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }
  findByEmailLocal () {
    return Axios.get(urlDev + '/users/' + tokenUser.email, {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }
}
