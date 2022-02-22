import mongoose from 'mongoose'
const curvaMessageSchema = mongoose.Schema({
    userId: String,
    avatar: String,
    message: String,    
    name: String,
    timestamp: String,
    received: Boolean})
export default mongoose.model('messagecontents', curvaMessageSchema)