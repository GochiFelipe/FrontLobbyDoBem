import Axios from 'axios'
var urlDev = 'http://localhost:8081/activity'
const tokenUser = JSON.parse(localStorage.getItem('userAuth'))
const person = JSON.parse(localStorage.getItem('person'))

export default class ActivityService {
  listForPerson (id) {
    return Axios.get(urlDev + '/list/' + person.data.personId, {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }
}