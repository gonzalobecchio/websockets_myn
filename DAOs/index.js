import * as dotenv from 'dotenv'
dotenv.config()

let messageDAO

switch (process.env.PERS) {
    case 'mongodb':
            const { default: MessagesDaoMongoDB } = await import('./messages/MessagesDaoMongoDB.js')  
            messageDAO = new MessagesDaoMongoDB()          
        break;
    case 'firebase':

        break;
    case 'fs':

        break;

    default:
        break;
}

export default messageDAO  