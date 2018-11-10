const knex = require('../knex')

// Gets all users in the database
const getAll = (limit) => {
  return knex('users')
    .then(users => users)
    .catch(err => Promise.reject(err))
}

// Creates a user from the given object
const create = (body) => {
  return knex('users')
    .insert(body)
    .returning('*')
    .then(user => user[0])
    .catch(err => Promise.reject(err))
}

// Returns the user with the given ID
const getOneUser = (id) => {
  return knex('users')
    .where('id', id)
    .then(user => user[0])
    .catch((err) => {
      Promise.reject(err)
    })
}

// Returns the user with the given githubId
const checkUser = (githubId) => {
  return knex('users')
    .where('githubId', githubId)
    .then(user => user[0])
    .catch((err) => {
      Promise.reject(err)
    })
}

// Deletes a user with the given ID
const deleteOne = (id) => {
  return knex('users')
    .where('id', id)
    .del()
    .returning('*')
    .then(user => user[0])
    .catch(err => Promise.reject(err))
}

module.exports = {
  getAll,
  create,
  getOneUser,
  deleteOne,
  checkUser
}