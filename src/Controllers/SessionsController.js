const AppError= require('.././Utils/AppError')
const knex= require('../Database/knex/index')
const {sign}= require('jsonwebtoken')
const AuthConfig= require('.././Configs/auth')
const { compare } = require('bcrypt')

class SessionsController{
  async create(request,response){
        const {email,password}= request.body
        const User= await knex('Users').where({email:email})
        if(!User[0]){
            throw new AppError('Email e/ou senha incorretos!')
        }
        const DatabasePassword= User[0].password

        const PasswordMatch= await compare(password,DatabasePassword)
        
        if(!PasswordMatch){
            throw new AppError('Email e/ou senha incorretos!')
        }

        const {secret,expiresIn}= AuthConfig.jwt

        const token= sign({},secret,{
            subject:String(User[0].id),
            expiresIn
        })
        response.json({User,token})
    }
 }

 module.exports= SessionsController