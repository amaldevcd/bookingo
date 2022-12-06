const express = require('express');
const path = require('path');
const connection = require('./db');
const db = require('./db')

const server  = express.Router();

const shows = require('./shows')
const theater = require('./theater');
const book = require('./book');
const ticket = require('./ticket')

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
app.use('/shows',shows);
app.use('/book',book);
app.use('/ticket',ticket);

app.listen(3030,()=>{
    console.log("Server is starting..");
})
module.exports=server;