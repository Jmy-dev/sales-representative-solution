import mongoose, { Mongoose } from 'mongoose';
import bcrypt from 'bcryptjs'

/*
name  required
email required
password  required
phonenumber required
isSeller
isDelivery
isAdmin
photo
PRODUCTS []
total spent   default 0
total recived default 0
review
 */

const userSchema = new mongoose.Schema({
    name:{
        type: String ,
        required: true ,
    } ,
    email:{
        type: String ,
        required: true ,
        unique: true
    } ,
    password:{
        type: String ,
        required: true
    } ,
    phoneNumber:{
        type:String ,
        required: true
    } ,
    isSeller:{
        type: Boolean ,
        default: false
    },
    isAdmin:{
        type: Boolean ,
        default: false
    },
    isDelivery:{
        type: Boolean ,
        default: false
    },
    photo:{
        type: String
    } ,
    products: [
        {
            type: mongoose.SchemaTypes.ObjectId ,
            ref:'product'
        }
    ] ,
    totalSpent:{
       type: Number ,
       default: 0
    },
    totalReceived:{
     type: Number ,
     default: 0
    } ,
    review: [
        {
            //text
            description: {
                type: String
            },
            //stars
            stars:{
                type: Number
            },
            //author
            author: {
                type: mongoose.SchemaTypes.ObjectId ,
                ref: 'user'
            }
        }
    ]

}, {timestamps:true})

userSchema.methods.checkPassword = function(password) {
    const passwordHash = this.password;
   
    return new Promise( (resolve , reject) => {
        bcrypt.compare(password , passwordHash , (err , same) => {
            if (err) {
                return reject(err)
            }
   
            resolve(same);
        })
    })
   }
   userSchema.pre('save' , function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    bcrypt.hash(this.password , 8 ,  (err , hash) => {
        if(err) {
            return next(err);
        }

        this.password = hash;
        next();

    })

})   

export const User = mongoose.model('user' , userSchema)