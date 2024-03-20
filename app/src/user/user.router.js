import {Router} from 'express';

import {me , getAllUsers , getUser , updateUser , getMyDeliverdProducts , getMyPendingProducts , getMyRawProducts} from './user.controller'

const router = Router();


// api/user/
router
.route('/')
.get(getAllUsers)

// api/user/me
router.get('/me' , me);
router.get('/me/products/deliverd' , getMyDeliverdProducts )
router.get('/me/products/pending' , getMyPendingProducts)
router.get('/me/products/raw' , getMyRawProducts)

//api/user/:id

router
.route('/:id')
.get(getUser)
.put(updateUser)



export default router;