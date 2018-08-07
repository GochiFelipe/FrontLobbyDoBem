import Axios from 'axios'
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
