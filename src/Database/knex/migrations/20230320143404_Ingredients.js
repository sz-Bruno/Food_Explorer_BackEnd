exports.up= knex=> knex.schema.createTable('Ingredients',Table=>{
    Table.increments('id')
    Table.text('name')
    Table.integer('dish_id').references('id').inTable('Dishes')
})
  



exports.down = knex=>knex.schema.dropTable('Ingredients')
  

