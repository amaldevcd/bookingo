const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/',async (req,res) =>
{
    if(req.session.uname)
    {
        var ticketQuery = "select * from Book where u_id in (select u_id from Users where username='"+req.session.uname+"')";
        await db.query(ticketQuery, function(error,result){
            if(error)console.log(error);
            else{
                res.render('list',{title:"My Tickets",result});
            }
        })
    }
   else
   res.redirect('/login/page');
    
})

module.exports = router;