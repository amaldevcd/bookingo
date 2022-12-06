const express = require('express');
const router = express.Router();
const db = require('./db');
const theater = require('./db');



router.get('/:mid/:tid',async (req,res)=>
{
    var m_id =req.params.mid
    var t_id=req.params.tid;
    var showSearch="select * from Shows where m_id='"+req.params.mid+"' and t_id='"+req.params.tid+"'";
    await db.query(showSearch,function(error,result){
        if(!!error)console.log(error);
        else
        {
            console.log(result[0].rem_seat);
            res.render('shows',{title:"Shows",result,m_id,t_id})
        }
    })
})

module.exports = router;