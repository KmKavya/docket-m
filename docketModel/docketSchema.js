var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only',
  }),
]
var docketSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
    validate: nameValidator
  },
  name: {
    type: String,
    required: true
  },
  application: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: false
  },
  createdBy: {
    type: String,
    unique: false
  },
  status: {
    type: String,
    required: true
  },
  eventDateTime: {
    type: Date,
    required: false
  },
  details: {
    type: String,
    required: true
  },
  keyDataAsJSON: {
    type: String,
    required: false
  },
  keywords: {
    type: String,
    required: false
  }
});

var docketCollection = mongoose.model('Docket', docketSchema);
module.exports = {
  docketCollection
};