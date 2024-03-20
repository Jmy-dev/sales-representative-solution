import { restart } from 'nodemon';
import {Product} from './product.model';
import { User } from '../user/user.model';


export const createProduct = async (req , res) => {

    try {
        const userId = req.body.sellerId; 
        const product = await Product.create(req.body);
    
        if(!product) {
            return res.status(400).end();
        }
        await User.findByIdAndUpdate({_id:userId } , {$push:{products:product._id}} )
        res.status(201).json({data: product})
        
    } catch (e) {
        console.log(e);
        res.status(400).end()
    }
}

export const getProduct = async (req , res) => {

    try {
        const product = await Product.findById(req.params.id)
        .lean()
        .exec()
    
        if(!product) {
            return res.status(400).end()
        }

        res.status(200).json({data: product})
        
    } catch (e) {
        console.log(e);
        res.status(400).end()
    }
}


export const updateProduct = async (req , res) => {

    try {
        let deliveryId = req.body.deliveryId;
        const updatedProduct = await Product.findByIdAndUpdate({_id:req.params.id} , req.body , {new: true})
        .lean()
        .exec()
        
        if(!updatedProduct){
            return res.status(400).end()
        }
        
        if(deliveryId) {
          const user = await User.findByIdAndUpdate({_id:deliveryId} , {$push:{products: req.params.id}} )
          .lean()
          .exec()
          console.log("Delivery is updated!!")
        }
        
        res.status(201).json({data : updatedProduct})
        
    } catch (e) {
        console.log(e);
        res.status(400).end()
    }


}


export const deleteProduct = async (req , res) => {

    try {
        let product = await Product.findById({_id: req.params.id});
        let sellerId = product.sellerId;
        
        const deletedProduct = await Product.findByIdAndRemove({_id: req.params.id})
        .lean()
        .exec()
       console.log("deleted product" , deletedProduct)
     
    
        if(!deletedProduct) {
            return res.status(400).end()
        }
        await User.findByIdAndUpdate({_id: sellerId} , {$pull:{products:deleteProduct._id}})
    
        res.status(200).json({msg: "Product has been deleted successfully!"})
        
    } catch (e) {
        console.log(e);
        res.status(400).end()
    }

}

export const getAllProducts = async (req , res) => {


    try {
        const startLocation = req.query.sourceLocation;
        const endLocation = req.query.targetLocation;

        if(!startLocation || !endLocation) {
            const products = await Product.find({})
            .lean()
            .exec()
        
            if(!products) {
                return res.status(400).end()
            }
        
            res.status(200).json({data: products})
        } else {
            const filteredProducts = await Product.find({sourceLocation:startLocation , targetLocation: endLocation})
            .populate('sellerId' , '-password')
            .lean()
            .exec()
    
            if(!filteredProducts) {
                return res.status(400).end()
            }
    
            res.status(200).json({data : filteredProducts})
        }
        
        
    } catch (e) {
        console.log(e);
        res.status(400).end()
    }
}


 //api/product/user/:id
export const getProductsBySeller = async (req , res) => {

    try {

        const user = await User.findById({_id: req.params.id}) 
        .lean()
        .exec()

        if(!user) {
            return res.status(400).json({error: "There is no user with this Id!!"})
        }

        const products = await Product.find({sellerId: req.params.id})
        .lean()
        .exec()
    
        if(!products) {
         return res.status(400).end()
        }

        res.status(200).json({data: products})
        
    } catch (e) {
        console.log(e);
        res.status(400).end()
    }


}


