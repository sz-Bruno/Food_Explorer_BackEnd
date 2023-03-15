const AppError= require('.././Utils/AppError')
const knex= require('../Database/knex/index')
const DiskStorage= require('.././Providers/DiskStorage')
const diskStorage= new DiskStorage()

class DrinkAvatarController{
    async update(request,response){
        const {id}= request.params
        const fileAvatar= request.file.filename
        const Drink= await knex('Drinks').where({id:id})

        if(!Drink[0]){
            throw new AppError('Bebida não encontrada!')
        }

        if(Drink[0].avatar){
           await diskStorage.deleteFile(Drink[0].avatar)
        }
         const UpdatedAvatar= await diskStorage.saveFile(fileAvatar)

         

         await knex('Drinks').update({avatar:UpdatedAvatar}).where({id:id})
        response.json(Drink[0])


    }
}









module.exports=DrinkAvatarController