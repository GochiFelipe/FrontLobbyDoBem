import Axios from 'axios'
var querystring = require('querystring')

export default class UserService {
  login (user) {
    return Axios.post('http://localhost:8081/oauth/token', querystring.stringify({
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
}
