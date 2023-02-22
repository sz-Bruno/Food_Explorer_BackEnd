
const { verify } = require('jsonwebtoken')
const AuthConfig= require('.././Configs/auth')
const AppError = require('../Utils/AppError')

function AuthConfirm(request,response,next){
    const authHeader= request.headers.authorization
    
    if(!authHeader){
        throw new AppError('JWT Token não informado.',401)
    }
    
    const [,token]=authHeader.split(" ")

    try {
       const {sub:dish_id}= verify(token, AuthConfig.jwt.secret)

       request.card={
        id: Number(dish_id)
       }
       return next()
        
    } catch {
        throw new AppError('JWT Token inválido',401)
    }
}


module.exports= AuthConfirm