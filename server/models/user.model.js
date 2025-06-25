import mongoose from "mongoose";

// const ChatSchema = new mongoose.Schema({
//     sentMessage: {
//         type: String,
//         require: true
//     },
//     receivedMessage: {
//         type: String,
//         require: true
//     }
// })

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    // Chat: [ChatSchema],
},
{
    timestamps: true
}
)


const User = mongoose.model("User", UserSchema)

export default User