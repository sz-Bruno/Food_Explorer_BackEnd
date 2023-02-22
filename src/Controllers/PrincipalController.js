const AppError = require("../Utils/AppError")
const knex= require('.././Database/knex/index')
class PrincipalController{
    async create(request,response){

        const {name,description,price}= request.body

       const Dish= await knex('Principal').where({name:name})
       if(Dish.length===1){
        throw new AppError('Já existe um prato cadastrado com este nome')
       }

       await knex('Principal').insert({name:name,description:description,price})
       response.status(201).json({message:`Prato ${name} cadastrado com sucesso!`})
    }

    async update(request,response){
        const {name,description,price}= request.body
        const dish_id= request.card.id

        const Dish= await knex('Principal').where({id:dish_id})

        if(Dish.length===0){
            throw new AppError('Prato não encontrado.')
        }

        Dish[0].name= name ?? Dish.name
        Dish[0].description= description ?? Dish.description
        Dish[0].price= price ?? Dish.price

        await knex('Principal').update({name,description,price}).where({id:dish_id})
        response.json({Dish})
    }
    async show(request,response){
        const dishs= await knex.select("*").from('Principal')
        response.json(dishs)
    }
}







module.exports= PrincipalController