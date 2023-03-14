const AppError = require("../Utils/AppError")
const knex= require('.././Database/knex/index')
class PrincipalController{
    async create(request,response){

        const {name,description,price,qtd}= request.body

      

       const CreatedDish=await knex('Principal').insert({name:name,description:description,price:price,qtd:qtd})
       response.status(201).json(CreatedDish[0])
    }

    async update(request,response){
        const {name,description,price,qtd}= request.body
        const {id}= request.params

        const Dish= await knex('Principal').where({id:id})

        if(Dish.length===0){
            throw new AppError('Prato não encontrado.')
        }

        Dish[0].name= name ?? Dish.name
        Dish[0].description= description ?? Dish.description
        Dish[0].price= price ?? Dish.price
        Dish[0].qtd= qtd ?? Dish.qtd

        await knex('Principal').update({name,description,price,qtd}).where({id:id})
        response.json({Dish})
    }
    async show(request,response){
        const dishs= await knex.select("*").from('Principal')
        response.json(dishs)
    }
}







module.exports= PrincipalController