import Axios from 'axios'
var urlDev = 'http://localhost:8081'
const tokenUser = JSON.parse(localStorage.getItem('userAuth'))

export default class StateService {
  listStates () {
    return Axios.get(urlDev + '/state', {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }
}
