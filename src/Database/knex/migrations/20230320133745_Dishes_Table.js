
exports.up = knex=> knex.schema.createTable('Dishes', Table=>{
    Table.increments('id')
    Table.text('title')
    Table.text('description')
    Table.float('price')
    Table.integer('qtd')
    Table.text('avatar')
    Table.text('category')
   
})

  



exports.down = knex=> knex.schema.dropTable('Dishes')
  

