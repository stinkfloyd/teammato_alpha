exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.varchar('username')
    table.integer('githubId')
    table.timestamps(true, true)
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}