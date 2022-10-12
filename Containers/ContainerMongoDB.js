import mongoose from 'mongoose'
import Message from '../ModelMongoDB/message.js'
import normalizr  from 'normalizr'
import util from 'util'


const { denormalize, normalize , schema } = normalizr



const author = new schema.Entity('author')

const messages = new schema.Entity('messages', {
    author: author
},{idAttribute: '_id'})

const chat = new schema.Entity('chat', {
  messages: [messages] 
})


class ContainerMongoDB {
    constructor(){
        try {
            mongoose.connect("mongodb+srv://gonzalobecchio:gonzalobecchio@cluster0.qssaypd.mongodb.net/?retryWrites=true&w=majority")
        } catch (error) {
            console.log(error)
        }
    }

    allMessages = async () => {
        const all =  await Message.find({}, {__v:0})
       
        const original_data = {}
        original_data.id = 999 
        original_data.messages = all
        let datos = JSON.stringify(original_data)
        const normalization = normalize(JSON.parse(datos) , chat)
        // console.log(normalization)
        // console.log(util.inspect(normalization, false, 10, true))
        return normalization
    }

    saveMessage = async (msge) => {
        const mensajes =  await Message.find({},{_id:0, __v:0})
        const id = !mensajes ? 1 : mensajes.length + 1 
        const newMsge = new Message({
            _id: id,
            author: {
                id: msge.email,
                name: msge.name,
                lastname: msge.lastname,
                age: msge.age,
                alias: msge.alias,
                avatar: msge.avatar
            }, 
            text: msge.message
        })
        newMsge.save()
    }
}

export default ContainerMongoDB  