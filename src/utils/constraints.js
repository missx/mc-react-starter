import validate from 'validate.js'

export const login = {
  email: {
    presence: { message: 'email.presence' },
    email: { message: 'email.invalid' },
  },
  password: {
    presence: { message: 'password.presence' },
  },
}

export const validations = (constraints, props = {}) =>
  data => validate(data.toJS(), constraints, props) || {}
