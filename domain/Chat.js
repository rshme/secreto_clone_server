import mongoose from 'mongoose'
const { Schema } = mongoose

const ChatSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    chat: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})

export default mongoose.model('Chat', ChatSchema)