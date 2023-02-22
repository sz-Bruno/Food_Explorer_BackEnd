class AppError{
    StatusCode
    Message
    constructor(Message,StatusCode=400){
        this.Message=Message
        this.StatusCode=StatusCode
    }
}

module.exports=AppError