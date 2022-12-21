import mongoose from "mongoose";
const { Schema } = mongoose

const UserSchema = new Schema({
        _id: {
            type: Schema.Types.ObjectId,
            auto: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        expired_at: {
            type: Date,
            required: true
        },
        chats: [{
            type: Schema.Types.ObjectId,
            ref: "Chat"
        }]
    }, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
)

export default mongoose.model('User', UserSchema)