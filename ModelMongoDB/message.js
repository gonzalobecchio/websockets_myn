import mongoose from "mongoose";

const { Schema } = mongoose

const Message = mongoose.model('Message', new Schema({
    _id: {
        type: 'Number', 
    },
    author: {
        type: {},
    },
    text: {
        type: 'String',
    }
}))

export default Message