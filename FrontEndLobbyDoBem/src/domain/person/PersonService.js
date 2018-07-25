import Axios from 'axios'
var urlDev = 'http://localhost:8081'
const tokenUser = JSON.parse(localStorage.getItem('userAuth'))

export default class PersonService {
  list () {
    return Axios.get(urlDev + '/person/all', {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }
  save (person) {
    return Axios.post(urlDev + '/save', person, {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }
  findPersonForUser (userId) {
    return Axios.get(urlDev + '/person/user/' + userId, {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }
}
