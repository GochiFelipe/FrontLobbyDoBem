export default class Activity {
  constructor (activityId = '', title = '', description = '', goals = '', dateCriation = '', dateUpdate = '', city = '', state = '', typeRegister = '', candidates = '') {
    this.activityId = activityId
    this.title = title
    this.description = description
    this.goals = goals
    this.dateCriation = dateCriation
    this.dateUpdate = dateUpdate
    this.city = city
    this.state = state
    this.typeRegister = typeRegister
    this.candidates = candidates
  }
}
