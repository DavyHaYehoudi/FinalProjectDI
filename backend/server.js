const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
require('./config/db');
require('dotenv').config({path:'./config/.env'});
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');
const app = express();


//cors
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
app.use(cors(corsOptions));

//Bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});


//routes
app.use('/api/user',userRoutes)
app.use('/api/post',postRoutes)


//server
app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})

