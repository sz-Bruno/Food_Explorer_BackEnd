const AppError= require('.././Utils/AppError')
const knex= require('.././Database/knex/index')

class DrinkController{
    async create(request,response){
        const {name,description,price}= request.body
        const Drink= await knex('Drinks').where({name:name})

        if(Drink.length===1){
            throw new AppError('Esta Bebida já está cadastrada!')
        }
        await knex('Drinks').insert({name:name,description:description,price:price})
        response.status(201).json({message:`Drink ${name} cadastrado com sucesso!`})
    }

    async update(request,response){
        const {id}= request.params
        const {name,description,price}= request.body
        
        const DrinkExists= await knex('Drinks').where({id:id})
        if(!DrinkExists[0]){
            throw new AppError('Bebida não encontrada!')
        }

        DrinkExists.name= name ?? DrinkExists.name
        DrinkExists.description= description ?? DrinkExists.description
        DrinkExists.price= price ?? DrinkExists.price

        await knex('Drinks').update({name,description,price}).where({id:id})
        response.status(200).json({message:'Dados da bebida atualizados!'})
    }
    async show(request,response){
        const Drinks= await knex.select("*").from ('Drinks')
        response.json(Drinks)
    }
}








module.exports= DrinkController