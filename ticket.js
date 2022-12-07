const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/:sid/:bid', async(req,res)=>{
    var mQuery = "select * from Movie where m_id in(select m_id from Shows where s_id='"+req.params.sid+"')";
    var tQuery = "select * from Theater where t_id in(select t_id from Shows where s_id='"+req.params.sid+"')";
    var sQuery = "select s_time from Shows where s_id='"+req.params.sid+"'";
    var bQuery = "select b_status,price,seat_no from Book where b_id='"+req.params.bid+"'";
    var b_id = req.params.bid;
    await db.query(mQuery,async function(error,mresult){
        if(!!error)console.log(error);
        else
        {
            await db.query(tQuery,async function(error,tresult){
                if(!!error)console.log(error);
                else{
                    await db.query(sQuery,async function(error,sresult){
                        if(!!error)console.log(error);
                        else{
                                var showtime = sresult[0].s_time;
                                await db.query(bQuery,async function(error,bresult){
                                    if(!!error)console.log(error);
                                    else{
                                        var b_status = bresult[0].b_status;
                                        var price = bresult[0].price;
                                        var seat_no = bresult[0].seat_no
                                        res.render('ticket',{title:"Confirm",mresult,tresult,showtime,b_id,b_status,price,seat_no,user : req.session.uname})
                                    }

                                })
                                
                            }
                        })   
                }
            })
        }
    })
})

module.exports = router;