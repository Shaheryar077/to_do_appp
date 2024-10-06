const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const bcrypt = require('bcrypt')



const userSchema = new Schema({
    username : {

        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type : String,
        required:true
    }
},{timestamps:true})


//Hash password
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

//    only decode the hash password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
// exporting file for use other components (userServices)

module.exports = mongoose.model('User', userSchema);


