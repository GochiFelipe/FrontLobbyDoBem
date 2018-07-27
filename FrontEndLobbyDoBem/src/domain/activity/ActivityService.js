import Axios from 'axios'
var urlDev = 'http://localhost:8081/activity'
const tokenUser = JSON.parse(localStorage.getItem('userAuth'))
const person = JSON.parse(localStorage.getItem('person'))

export default class ActivityService {
  listForPerson () {
    return Axios.get(urlDev + '/list/' + person.data.personId, {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }

  listForPersonAndEnable () {
    return Axios.get(urlDev + '/enable/' + person.data.personId, {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }

  findById (id) {
    return Axios.get(urlDev + '/' + id, {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }

  saveActivity (activity) {
    return Axios.post(urlDev + '/' + person.data.personId, activity, {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }

  deleteActivity (id) {
    return Axios.delete(urlDev + '/' + id, {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }

  editActivity (activity) {
    return Axios.put(urlDev + '/update', activity, {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }
}
