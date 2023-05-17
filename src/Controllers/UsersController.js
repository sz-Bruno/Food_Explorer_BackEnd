const knex= require('../Database/knex/index')
const AppError= require('.././Utils/AppError')
const {hash, compare}=require ('bcrypt')

class UsersController{
    async create(request,response){
        const {name,email,password,Admin}= request.body
        const UserAlredyExists= await knex('Users').where({email:email})
    
        if(UserAlredyExists.length===1){
            throw new AppError('Este email já está cadastrado!')
        }
        const hashedPassword= await hash(password,8)

        await knex('Users').insert({name,email,password:hashedPassword,Admin})
        response.status(201).json({message:`Usuário ${name} cadastrado com sucesso!`})

    }
    async update(request,response){
        const {name,email,password,Admin}= request.body
        const user_id= request.card.id
        const User= await knex('Users').where({id:user_id})
        const UserWithSameEmail= await knex('Users').where({email:email})
        if(!User[0]){
            throw new AppError('Usuário não encontrado')
        }
        if(UserWithSameEmail[0]&& User[0].id !== UserWithSameEmail[0].id){
            throw new AppError('Este email já está em uso!')
        }
        const hashedPassword= await hash(password,8)

        User[0].name= name ?? User[0].name
        User[0].email= email ?? User[0].email
        User[0].password= hashedPassword ?? User[0].password
        User[0].Admin= Admin ?? User[0].Admin

        await knex('Users').update({name:User[0].name, email:User[0].email,password:User[0].password, Admin:User[0].Admin}).where({id:user_id})
        response.status(200).json({message:`Dados do(a) usuário(a) ${name} atualizados`})
    }
}



module.exports=UsersController