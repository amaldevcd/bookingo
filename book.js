const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/:sid', async(req,res)=>
{
    var book = "select rem_seat from s_id='"+req.params.sid+"'";
    await db.query(book,function(error,result){
        if(!!error)
        {
            console.log(error);
        }
        else{
            var remSeat = result[0].rem_seat
            res.render('book',{title:"Book",remSeat});
        }
    })
   
})


module.exports = router;