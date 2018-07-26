import Axios from 'axios'
var urlDev = 'http://localhost:8081'
const tokenUser = JSON.parse(localStorage.getItem('userAuth'))

export default class CandidateService {
  list () {
    return Axios.get(urlDev + '/candidates/all', {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }
}
