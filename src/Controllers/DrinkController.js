const AppError= require('.././Utils/AppError')
const knex= require('.././Database/knex/index')

class DrinkController{
    async create(request,response){
        const {name,description,price,qtd}= request.body
        const Drink= await knex('Drinks').where({name:name})

        if(Drink.length===1){
            throw new AppError('Esta Bebida já está cadastrada!')
        }
        const Created_Drink=await knex('Drinks').insert({name:name,description:description,price:price,qtd:qtd})
        response.status(201).json(Created_Drink[0])
    }

    async update(request,response){
        const {id}= request.params
        const {name,description,price,qtd}= request.body
        
        const DrinkExists= await knex('Drinks').where({id:id})
        if(!DrinkExists[0]){
            throw new AppError('Bebida não encontrada!')
        }

        DrinkExists.name= name ?? DrinkExists.name
        DrinkExists.description= description ?? DrinkExists.description
        DrinkExists.price= price ?? DrinkExists.price
        DrinkExists.qtd= price ?? DrinkExists.qtd

        const UpdatedDrink=await knex('Drinks').update({name,description,price,qtd}).where({id:id})
        response.status(200).json(UpdatedDrink[0])
    }
    async show(request,response){
        const Drinks= await knex.select("*").from ('Drinks')
        response.json(Drinks)
    }
    async delete(request,response){
        const{id}= request.params
         await knex('Drinks').where({id:id}).del()
    }
}








module.exports= DrinkController