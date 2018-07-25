export default class Person {
  constructor (name = '', middlename = '', lastname = '', cpf = '', address = '', complements = '', cep = '', email = '', phoneNumber = '', commercialNumber = '', residencialNumber = '') {
    this.name = name
    this.middlename = middlename
    this.lastname = lastname
    this.cpf = cpf
    this.address = address
    this.complements = complements
    this.cep = cep
    this.email = email
    this.phoneNumber = phoneNumber
    this.commercialNumber = commercialNumber
    this.residencialNumber = residencialNumber
  }
}
