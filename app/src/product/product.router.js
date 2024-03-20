import {Router} from 'express';

import {createProduct , getProduct , getAllProducts , getProductsBySeller , updateProduct , deleteProduct} from './product.controller'

const router = Router()


//api/product

router
.route('/')
.get(getAllProducts)
.post(createProduct)


//api/product/:id

router
.route('/:id')
.get(getProduct)
.put(updateProduct)
.delete(deleteProduct)


//api/product/user/:id

router
.route('/user/:id')
.get(getProductsBySeller)


export default router;