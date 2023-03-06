
exports.up = knex=> knex.schema.createTable("Desserts",Table=>{
    Table.increments('id')
    Table.text('name')
    Table.text('description')
    Table.float('price')
    Table.text('avatar')
})


exports.down = knex=> knex.schema.dropTable("Desserts")
