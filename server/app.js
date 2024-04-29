const express=require('express');
const app=express();
const router=require('./routes/routes')
const session=require('express-session')
const cors = require('cors')
const cookieParser = require('cookie-parser')
//setting up the middlewares 
app.use(cors({
  origin: ["http://localhost:3000"] ,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));
app.set('view engine', null);
app.use(express.static('public'))
//setting the sessions and express validator 
app.use(session({
    secret:'secret key',
    resave: false,
    saveUninitialized:false,
    cookie: {
        secure: false,
        maxAge: 100*60*60*24
    }
}))
const port= 5000;
app.use(router);
app.listen(port, ()=>{
    console.log(`running on port ${port}`);
})