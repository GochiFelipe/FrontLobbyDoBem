import Axios from 'axios'

function getHostName (url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2]
  } else {
    return null
  }
}

var urlDev = 'http://' + getHostName(window.location.href) + ':8081/activity'
const tokenUser = JSON.parse(localStorage.getItem('userAuth'))
const person = JSON.parse(localStorage.getItem('userAuth'))

export default class ActivityService {
  listForPerson () {
    return Axios.get(urlDev + '/list/' + person.data.personId, {
      headers: {
        'Authorization': 'bearer ' + tokenUser.token,
        'Content-Type': 'application/json'
      }
    })
  }

  listForPersonAndEnable (id) {
    return Axios.get(urlDev + '/enable/' + id, {
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

  saveActivity (activity, id) {
    return Axios.post(urlDev + '/' + id, activity, {
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
