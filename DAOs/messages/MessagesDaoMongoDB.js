import  ContainerMongoDB    from "../../Containers/ContainerMongoDB.js";

class MessagesDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super()
    }
    
    all = async () => {
        return await this.allMessages()
    }

    save = async (msge) => {
        await this.saveMessage(msge)
    }
}

export default  MessagesDaoMongoDB  