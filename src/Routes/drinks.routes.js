const {Router}= require('express')
const DrinksRoutes= Router()
const DrinkController= require('.././Controllers/DrinkController')
const drinkController= new DrinkController()
const DrinkAvatarController= require('../Controllers/DrinkAvatarController')
const drinkAvatarController= new DrinkAvatarController()
const UploadConfig= require('.././Configs/upload')
const multer = require('multer')
const upload= multer(UploadConfig.MULTER)

DrinksRoutes.post('/',drinkController.create)
DrinksRoutes.put('/:id',drinkController.update)
DrinksRoutes.get('/',drinkController.show)
DrinksRoutes.patch('/:id',upload.single('avatar'),drinkAvatarController.update)







module.exports=DrinksRoutes