const AppError= require('.././Utils/AppError')
const knex= require('.././Database/knex/index')
class PrincipalController{
    async create(request,response){

        const {name,description,price,qtd}= request.body
        const Dish= await knex('Principal').where({name:name})

        if(Dish.length>0){
            throw new AppError('Este prato já está cadastrado!')
        }

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

        const UpdatedDish=await knex('Principal').update({name,description,price,qtd}).where({id:id})
        response.json(UpdatedDish[0])
    }
    async show(request,response){
        const dishs= await knex.select("*").from('Principal')
        response.json(dishs)
    }
    async delete(request,response){
        const{id}= request.params
         await knex('Principal').where({id:id}).del()
    }
}







module.exports= PrincipalController