const express = require('express');
const path = require('path');
const connection = require('./db');
const db = require('./db')

const theater = require('./theater');

const app = express();

app.set('view engine','ejs');

app.use('/static',express.static(path.join(__dirname,'public')))

app.get('/',async (req,res)=>
{
    var movieSearch ="select * from Movie"
    await connection.query(movieSearch,async function(error,result,rows){
        if(!!error)console.log(error);
        else{
            res.render('dashboard',{title:"Home",result});
        }
    })
})

app.use('/theater',theater);

app.listen(3030,()=>{
    console.log("Server is starting..");
})