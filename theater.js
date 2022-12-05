const express = require('express');
const router = express.Router();

router.get('/:tid',(req,res)=>
{
    console.log(req.params);
    
    res.render('theater');
})

module.exports =router;