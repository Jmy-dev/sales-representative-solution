import express from 'express'
import {json , urlencoded} from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose';
import {config} from './config/dev'
import { protect , signup , signin} from './utils/auth'
import userRouter from './src/user/user.router';
import productRouter from './src/product/product.router'


//app config
const app = express();
const PORT = 8000 || process.env.PORT ;

//morgan and cors config
app.use(morgan('dev'))
app.use(cors())

// bodyParser config
app.use(urlencoded({extended: true}));
app.use(json())



// apis
app.post('/signup', signup)
app.post('/signin' , signin)
app.use('/api' , protect);
app.use('/api/user' ,userRouter )
app.use('/api/product' , productRouter)



mongoose.connect(config.secrets.dbConnection , {useNewUrlParser:true , useUnifiedTopology: true })
.then( () => {
    console.log("db is connected!!")
    app.listen(PORT , () => {
        console.log(`server is running on port ${PORT}`)
    })
})
.catch( (e) => { console.error(e)})