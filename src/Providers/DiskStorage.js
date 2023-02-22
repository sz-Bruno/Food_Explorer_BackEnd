const fs= require('fs')
const path= require('path')
const UploadConfig= require('.././Configs/upload')


class DiskStorage{
    async saveFile(file){

        await fs.promises.rename(
            path.resolve(UploadConfig.TMP_FOLDER,file),
            path.resolve(UploadConfig.UPLOADS_FOLDER,file)
 
        )
        return file
    }

    async deleteFile(file){
        const filePath= path.resolve(UploadConfig.UPLOADS_FOLDER,file)
        
        try {
            await fs.promises.stat(filePath)
           
        } catch {
            return
        }
        await fs.promises.unlink(filePath)
    }
}

module.exports= DiskStorage