import mongoose from 'mongoose';

/*
name 
price
source location
target location
description
deliveryDate
devliveryCost
isDeliverd default false
sellerId

Notes
buyer Number
typeOfDelivery
 */
const productSchema = mongoose.Schema ({
    name: {
        type: String ,
        required: true
    } ,
    price: {
        type: String ,
        required: true
    } ,
    sourceLocation:{
        type: String ,
        required: true
    } ,
    targetLocation:{
        type: String ,
        required: true
    } ,
    description:{
        type: String ,
        required: true
    } ,
    deliveryDate: {
        type: Date ,
        required: true
    } ,
    deliveryCost: {
        type: String ,
        required: true
    } ,
    isDeliverd: {
        type: Boolean ,
        default: false
    } ,
    sellerId: {
        type: mongoose.SchemaTypes.ObjectId ,
        ref: 'user' 
    } ,
    deliveryId: {
      type: mongoose.SchemaTypes.ObjectId ,
      ref:'user'
    },
    buyerNumber: {
        type: String ,
        required: true
    } ,
    typeOfDelivery: {
        type: String ,
        enum: ['bicycle' , 'car' , 'motorcycle']
    } ,
    notes : {
        type: String 
    } ,
    isPending: {
        type: Boolean , 
        default: false
    }  ,
    isRaw : {
        type: Boolean ,
        default: true
    } ,
    

})

export const Product = mongoose.model('product' , productSchema);