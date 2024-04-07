require('dotenv').config();
const express=require('express');
const mysql=require('mysql');
const db=mysql.createConnection({
host:process.env.DB_HOST,
user:process.env.DB_USER,
password:process.env.DB_PASSWORD,
database:process.env.DATABASE
})
db.connect((error)=>{
    if(error) 
    {throw error }
    else{
        console.log('database connected successfully!')
    }
})
module.exports=db;