
const knex= require('../Database/knex/index')
const DiskStorage= require('../Providers/DiskStorage')
const AppError= require('../Utils/AppError')

class PrincipalAvatarController{

    async update(request,response){
        const dish_id= request.card.id
        const fileAvatar= request.file.filename
        const diskStorage= new DiskStorage()

        const Dish= await knex('Principal').where({id:dish_id})

        if(!Dish[0]){
            throw new AppError('Prato não encontrado',401)
        }

        if(Dish[0].avatar){
            await diskStorage.deleteFile(Dish[0].avatar)
        }

        const newAvatar= await diskStorage.saveFile(fileAvatar)

        await knex('Principal').update({avatar:newAvatar}).where({id:dish_id})

        return response.json(Dish[0])

    }
}

module.exports= PrincipalAvatarController