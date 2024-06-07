import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    email : {required: true, type: 'string'},
    password : {required: true, type: 'string'}
},{timestamps: true})

export default mongoose.models.User || mongoose.model('User', userSchema);

