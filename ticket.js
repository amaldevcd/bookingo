const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/:sid', async(req,res)=>{
    var mQuery = "select * from Movie where m_id in(select m_id from Shows where s_id='"+req.params.sid+"')";
    var tQuery = "select * from Theater where t_id in(select t_id from Shows where s_id='"+req.params.sid+"')";
    var sQuery = "select s_time from Shows where s_id='"+req.params.sid+"')";
    await db.query(mQuery,async function(error,mresult){
        if(!!error)console.log(error);
        else
        {
            await db.query(tQuery,async function(error,tresult){
                if(!!error)console.log(error);
                else{
                    await db.query(tQuery,function(error,sresult){
                        if(!!error)console.log(error);
                        else{
                                var showtime = sresult[0].s_time;
                                res.render('ticket',{title:"Confirm",mresult,tresult,showtime})
                            }
                        })   
                }
            })
        }
    })
})

module.exports = router;