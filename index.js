const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

require('dotenv').config();
console.log(process.env.SESSION_SECRET)

const foodRouter = require('./router/food.router')
const loginRouter = require('./router/auth.router')
const validateAuth = require('./validate/auth.validate')
const productsRouter = require('./router/products.router')
const reportRouter = require('./router/report.router')
const sessionMiddleware = require('./middleware/session.middleware')
const errorRouter = require('./router/error.router')
const orderListRouter = require('./router/orderList.router')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('process.env.SESSION_SECRET'));
app.use(sessionMiddleware)
app.use(express.static('public'));

// app.get('/', function (req, res) {
//     res.render('home');
// });

app.use('/food', validateAuth.requestAuth, foodRouter);
app.use('/auth', loginRouter);
app.use('/',  productsRouter);

app.use('/reports', validateAuth.requestAuth, reportRouter);
app.use('/orderList', validateAuth.requestAuth, orderListRouter);
app.use('/error', validateAuth.requestAuth, errorRouter);

app.listen(port, function () {
    console.log("port: " + port);
})