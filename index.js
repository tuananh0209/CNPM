const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require('dotenv').config();
console.log(process.env.SESSION_SECRET)

const userRouter = require('./router/users.router')
const loginRouter = require('./router/auth.router')
const validateAuth = require('./validate/auth.validate')
const productsRouter = require('./router/products.router')
const sessionMiddleware = require('./middleware/session.middleware')
const cartRouter = require('./router/cart.router')
const db = require('./db')

const app = express();
const port = 3000;

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('process.env.SESSION_SECRET'));
app.use(sessionMiddleware)
app.use(express.static('public'));

app.get('/',function(req , res){
    res.render('index');
});

app.use('/users',validateAuth.requestAuth, userRouter);
app.use('/auth', loginRouter);
app.use('/products', validateAuth.requestAuth, productsRouter);
app.use('/cart', validateAuth.requestAuth, cartRouter);

app.listen(port , function(){
    console.log("port: " + port);
})