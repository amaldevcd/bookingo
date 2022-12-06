const express = require('express');
const path = require('path');
const connection = require('./db');
const db = require('./db')
const bodyparser = require('body-parser')

const server  = express.Router();

const shows = require('./shows')
const theater = require('./theater');
const book = require('./book');
const ticket = require('./ticket')
const pay = require('./pay')

const app = express();

app.set('view engine','ejs');

app.use('/static',express.static(path.join(__dirname,'public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

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
app.use('/pay',pay);

app.listen(3030,()=>{
    console.log("Server is starting..");
})
module.exports=server;