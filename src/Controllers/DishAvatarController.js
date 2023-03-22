const AppError= require('../Utils/AppError')
const knex= require('.././Database/knex/index')
const DiskStorage= require('.././Providers/DiskStorage')
const diskStorage= new DiskStorage()

class DishAvatarController{
    async update(request,response){
        const {id}= request.params
        const fileAvatar= request.file.filename

        const Dish= await knex('Dishes').where({id:id})

        if(!Dish[0]){
            throw new AppError('Prato não encontrado!')
        }

        if(Dish[0].avatar){
            await diskStorage.deleteFile(Dish[0].avatar)
        }

       const UpdatedAvatar= await diskStorage.saveFile(fileAvatar)

       await knex('Dishes').update({avatar:UpdatedAvatar}).where({id:id})
       response.json(Dish[0])
    }
}


module.exports= DishAvatarController