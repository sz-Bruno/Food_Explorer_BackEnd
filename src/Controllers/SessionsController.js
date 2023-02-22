const AppError= require('.././Utils/AppError')
const knex= require('../Database/knex/index')
const {sign}= require('jsonwebtoken')
const AuthConfig= require('.././Configs/auth')
class SessionsController{
  async create(request,response){
        const {name}= request.body
        const Dish= await knex('Principal').where({name:name})

        if(Dish.length===0){
            throw new AppError('Prato não encontrado',401)
        }
        const {secret,expiresIn}= AuthConfig.jwt

        const token= sign({},secret,{
            subject:String(Dish[0].id),
            expiresIn
        })
        response.json({Dish,token})
  }
 }

 module.exports= SessionsController