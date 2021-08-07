const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isActivated: {type: String, default: false},
  activationLink: {type: String},
  //records: {type: Types.ObjectId, ref: 'Records'}
})

module.exports = model('User', schema)