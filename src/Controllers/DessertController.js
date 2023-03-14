const AppError= require('.././Utils/AppError')
const knex= require('.././Database/knex/index')

class DessertController{
    async create(request,response){
        const {name,description,price,qtd}= request.body
        const Dessert= await knex('Desserts').where({name:name})

        if(Dessert.length===1){
            throw new AppError('Esta sobremesa já está cadastrada!')
        }
        await knex('Desserts').insert({name:name,description:description,price:price,qtd:qtd})
        response.status(201).json({message:`Sobremesa ${name} cadastrada com sucesso!`})
    }

    async update(request,response){
        const {id}= request.params
        const {name,description,price,qtd}= request.body
        
        const DessertExists= await knex('Desserts').where({id:id})
        if(!DessertExists[0]){
            throw new AppError('Sobremesa não encontrada!')
        }

        DessertExists.name= name ?? DessertExists.name
        DessertExists.description= description ?? DessertExists.description
        DessertExists.price= price ?? DessertExists.price
        DessertExists.qtd= qtd ?? DessertExists.qtd

        await knex('Desserts').update({name,description,price,qtd}).where({id:id})
        response.status(200).json({message:'Dados da sobremesa atualizados!'})
    }
    async show(request,response){
        const Desserts= await knex.select("*").from ('Desserts')
        response.json(Desserts)
    }
}

module.exports= DessertController