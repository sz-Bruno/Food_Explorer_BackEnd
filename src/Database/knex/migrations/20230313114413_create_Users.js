
exports.up= knex=> knex.schema.createTable('Users',Table=>{
    Table.increments('id')
    Table.text('name')
    Table.text('email')
    Table.integer('password')
})
  



exports.down = knex=>knex.schema.dropTable('Users')
  

