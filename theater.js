const express = require('express');
const router = express.Router();
const db = require('./db')
const server = require('./server')



router.get('/:tid',async(req,res)=>
{   
    console.log("m_id : "+req.params.tid);
    var m_id=req.params.tid;
    var theaterSearch = "select * from Theater where m_id='"+req.params.tid+"'"
    await db.query(theaterSearch,async function(error,result,rows){
        if(!!error)log(error)
        else{
            res.render('theater',{title:"Theater",result,m_id,user : req.session.uname});
        }
    })
    
})

module.exports =router;