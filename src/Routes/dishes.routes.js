const {Router}= require('express')
const DishRoutes= Router()
const DishController= require('../Controllers/DishController')
const DishAvatarController= require('.././Controllers/DishAvatarController')
const dishAvatarController= new DishAvatarController()
const dishController= new DishController()



const multer= require('multer')
const UploadConfig= require('../Configs/upload')
const upload= multer(UploadConfig.MULTER)


DishRoutes.get("/:id", dishController.show)
DishRoutes.get("/", dishController.index)
DishRoutes.post("/", dishController.create)
DishRoutes.put("/:id",dishController.update)
DishRoutes.patch('/:id', upload.single('avatar'),dishAvatarController.update)
DishRoutes.delete("/:id", dishController.delete)



module.exports= DishRoutes