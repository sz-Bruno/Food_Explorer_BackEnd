
const knex= require('../Database/knex/index')
const AppError = require('../Utils/AppError')

async function AuthAdmin(request,response,next){
    let {Admin}= request.body
     const AdminAlreadyExists= await knex('Users').where({Admin:1})
     try {
      if(AdminAlreadyExists){
      
         Admin=0
       
        }
        if(!AdminAlreadyExists){
         
         Admin=1
   
        }
        
     } catch (error) {

      if(error.response){
         alert(error.response.data.message)
      }
       
     }

    
      
        return next()

    
}


module.exports= AuthAdmin