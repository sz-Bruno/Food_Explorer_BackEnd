const AppError= require('../Utils/AppError')
const knex= require('.././Database/knex/index')
const DiskStorage= require('.././Providers/DiskStorage')
const diskStorage= new DiskStorage()

class DessertAvatarController{
    async update(request,response){
        const {id}= request.params
        const fileAvatar= request.file.filename

        const Dessert= await knex('Desserts').where({id:id})

        if(!Dessert[0]){
            throw new AppError('Sobremesa não encontrada!')
        }

        if(Dessert[0].avatar){
            await diskStorage.deleteFile(Dessert[0].avatar)
        }

       const UpdatedAvatar= await diskStorage.saveFile(fileAvatar)

       await knex('Desserts').update({avatar:UpdatedAvatar}).where({id:id})
       response.json(Dessert)
    }
}


module.exports= DessertAvatarController