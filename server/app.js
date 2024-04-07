const express=require('express');
const app=express();
const router=require('./routes/routes')
const session=require('express-session')
const fileupload=require('express-fileupload')
const cors = require('cors')
//setting up the middlewares 
app.use(fileupload())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//setting the sessions and express validator 
app.use(session({
    secret:'secret key',
    resave: true,
    saveUninitialized:true,
    cookie: {
        maxAge: 100*60*60*24
    }
}))
const port= 5000;
app.use(router);
app.use((req, res, next)=>{
 res.status(404).render('404')
})
app.listen(port, ()=>{
    console.log(`running on port ${port}`);
})