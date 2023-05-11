const AppError= require('.././Utils/AppError')
const knex= require('.././Database/knex/index')
class DishController{
    async create(request,response){

        const {title,description,price,qtd,category,ingredients}= request.body
        const Dish= await knex('Dishes').where({title:title})

        if(Dish.length>0){
            throw new AppError('Este prato já está cadastrado!')
        }
      
       const CreatedDish=await knex('Dishes').insert({title:title,description:description,price:price,qtd:qtd,category:category})

       const ingredient= ingredients.map(item=>{
        return {
            name:item,
            dish_id: CreatedDish[0]
        }
       })
      await knex('Ingredients').insert(ingredient)
       response.status(201).json(
        CreatedDish[0]
        )
    }

    async update(request,response){
        const {title,description,price,qtd,category,ingredients}= request.body
        const {id}= request.params

        const Dish= await knex('Dishes').where({id:id})

        if(Dish.length===0){
            throw new AppError('Prato não encontrado.')
        }

        Dish[0].title= title ?? Dish.title
        Dish[0].description= description ?? Dish.description
        Dish[0].price= price ?? Dish.price
        Dish[0].qtd= qtd ?? Dish.qtd
        Dish[0].category= category ?? Dish.category

        const UpdatedDish=await knex('Dishes').update({title,description,price,qtd,category}).where({id:id})
        
        const ingredient= ingredients.map(item=>{
            return {
                name:item,
                dish_id: id
            }
           })
           await knex('Ingredients').where({dish_id:id}).del()
           await knex('Ingredients').insert(ingredient).where({dish_id:id})
        response.json(
            UpdatedDish[0]
            )
    }
    async show(request,response){
        const {id}= request.params
        const dishs= await knex('Dishes').where({id:id})
        const ingredients= await knex('Ingredients').where({dish_id:id}).orderBy('name')
        
        response.json({
            ...dishs[0],ingredients
        })
    }
    async index(request,response){
        const {title,ingredients}= request.query
   
        let dishs
       

        if(ingredients){
             const filtered_ingredient= ingredients.split(',').map(item=>item.trim())

            dishs= await knex('Ingredients')
            .select([
                "Dishes.id",
                "Dishes.title",
                "Dishes.description",
                "Dishes.price",
                "Dishes.qtd",
                "Dishes.avatar",
                "Dishes.category"
            ])
            .whereLike('Dishes.title',`%${title}%`)
            .whereIn('name',filtered_ingredient)
            .innerJoin('Dishes',"Dishes.id","Ingredients.dish_id")
            .groupBy("Dishes.id")
            .orderBy('Dishes.title')
           
        }else{
            dishs= await knex("Dishes")
            .whereLike("title", `%${title}%`)
            .orderBy("title");
            
        }
        const Ingredients = await knex("Ingredients") 
         const DIshWithIngredient=dishs.map(dish =>{
            const dishIngredient = Ingredients.filter(item => item.dish_id === dish.id)

            return {
                dish,
                ingredients:dishIngredient
            }
        }) 
            
        return response.json(DIshWithIngredient)  
    }
    async delete(request,response){
        const{id}= request.params
         await knex('Dishes').where({id:id}).del()
         await knex('Ingredients').where({dish_id:id}).del()
    }
}



module.exports= DishController