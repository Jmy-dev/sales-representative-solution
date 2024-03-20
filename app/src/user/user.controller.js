import {User} from './user.model';
import {Product} from '../product/product.model'


/*
 signup   done
 signin   done
 get me   done
 updateUser done
 get user  done
 getAllUsers
  */
export const me = (req , res) => {
    console.log("Hi")
    res.status(200).json({data: req.user})
}

export const getUser = async (req , res) => {
    try {
        const user = await User.findById(req.params.id) 
        .select('-password')
        .lean()
        .exec()
    
        if(!user) {
            return res.status(400).end()
        }
    
        res.status(200).json({data: user});
        
    } catch (e) {
        console.log(e);
         res.status(400).end()
    }
}


export const updateUser = async (req , res) => {
    try {
         //OWNER
         const ownerId = req.params.id;
         //EXECUTER 
         const executerId = req.user._id;

         if(req.user.isAdmin || (executerId == ownerId)) {

             const updatedUser = await User.findByIdAndUpdate({_id: ownerId} , req.body , {new: true})
             .lean()
             .exec()
     
             if(!updatedUser) {
                 return res.status(400).end()
             }
             res.status(201).json({data:updatedUser})
         } else {
             return res.status(401).json({msg: "You aren't authorized to perform such an action!"})
         }

        
    } catch (e) {
        console.log(e);
        res.status(400).end()   
    }
}


export const getAllUsers = async (req , res) => {

    try {
        if(req.user.isAdmin){
            const users = await User.find({})
            .select('-password')
            .lean()
            .exec()
        
            if(!users) {
                return res.status(400).end()
            }
            res.status(200).json({data: users})

        } else{
            return res.status(401).json({error: "You are not authorized to perform such an action!!"})
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).end()   
    }
}

export const getMyDeliverdProducts = async (req , res) => {
    let executer;
    let products;
     console.log(req.user)
    if(req.user.isSeller) {
        products = await Product.find({sellerId: req.user._id , isDeliverd: true})
    .lean()
    .exec()
    } else if(req.user.isDelivery) {
        products = await Product.find({deliveryId: req.user._id , isDeliverd: true})
        .lean()
        .exec()
    }

     

    if(!products){
        return res.status(400).end()
    }
    if(products.length === 0) {
        return res.status(400).json({msg: "There is no deliverd products yet!!"})
    }

    return res.status(200).json({data: products})

}

export const getMyPendingProducts = async (req , res) => {
    let executer;
    let products;

    if(req.user.isSeller) {
        products = await Product.find({sellerId: req.user._id , isPending: true})
        .lean()
        .exec()
    } else if(req.user.isDelivery) {
        products = await Product.find({deliveryId: req.user._id , isPending: true})
        .lean()
        .exec()
    }
     

    if(!products){
        return res.status(400).end()
    }
    if(products.length === 0) {
        return res.status(400).json({msg: "There is no pending products yet!!"})
    }

    return res.status(200).json({data: products})

}

export const getMyRawProducts = async (req , res) => {
    let executer;
    let products;
    if(req.user.isSeller) {
        products = await Product.find({sellerId: req.user._id , isRaw: true})
        .lean()
        .exec()
    } else if(req.user.isDelivery) {
        products = await Product.find({deliveryId: req.user._id , isRaw: true})
        .lean()
        .exec()
    }

     

    if(!products) { 
        return res.status(400).json({msg:"There is no products Yet!!!"})
    }
    
    if(products.length === 0) {
        return res.status(400).json({msg: "There is no raw products yet!!"})
    }

    return res.status(200).json({data: products})
    
}

// refactor last 3 functions