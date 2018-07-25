import Axios from 'axios'
var querystring = require('querystring')
var urlDev = 'http://localhost:8081'
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
}
