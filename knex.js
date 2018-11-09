// Require knex + detect environment
const environment = process.env.NODE_ENV || 'development'
const knex = require('knex')(knexConfig)
const knexConfig = require('./knexfile')[environment]

module.exports = knex