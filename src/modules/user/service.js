const userModel = require('../../backend/mongo/schemas/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

function generateToken(user) {
  return jwt.sign(_.pick(user, ['_id', 'type', 'username']), process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

function comparePassword(password, userPassword) {
  return bcrypt.compareSync(password, userPassword)
}

function getUserByUsername(username) {
  return userModel.findOne({ username },  {}, { lean: true })
}

function createUser(username, password, type) {
  return userModel.create({ username, password, type })
}

function hashPassword(password) {
  return bcrypt.hash(password, 10)
}
module.exports = {
  generateToken,
  comparePassword,
  getUserByUsername,
  createUser,
  hashPassword
}
