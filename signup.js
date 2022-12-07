var express = require('express')
const mysql = require('mysql');
const db = require('./db');

const router = express.Router();

var errormsg=null;
var newuser=true;
var successnote=null;




router.get('/page',(req,res)=>{
    res.render('signup',{title:"Sign Up",errormsg,successnote})
})

router.post('/',async (req,res)=>{
    var name = req.body.name;
    var username = req.body.username;
    var mobno=req.body.mobno;
    var passwd=req.body.passwd;
    var cpasswd=req.body.cpasswd;
    var u_id = Math.floor(Math.random() * 999999);
    var usernameSearch = "select username from Users where username='"+username+"'";

    await db.query(usernameSearch,async function(error,result){
        console.log("usrsrch : "+result + " "+result.length)
        if(!!error)console.log(error);
        else{
            if(result.length==0)
            {
                newuser=true;
                console.log("new user");
            }
            else
            {
                newuser=false;
                console.log("Not new user");
            }
        }
        console.log(name + " " + username + " " + mobno + " " + passwd + " ");
    if(name=="" || username=="" || mobno=="" || passwd=="" || cpasswd=="")
    {
        errormsg="empty datafields";
        successnote=null;
        res.redirect('/signup/page');
    }
    else if(newuser==false)
    {
        errormsg="username already exist";
        successnote=null;
        res.redirect('/signup/page');
    }
    else if(passwd!=cpasswd)
    {
        errormsg="passwords do not match";
        successnote=null;
        res.redirect('/signup/page');
    }
    else
    {
        console.log("usr status : ",newuser);
        var insertion = "insert into Users values('"+u_id+"','"+name+"','"+mobno+"','"+passwd+"','"+username+"')";
        await db.query(insertion,function(error,result){
            if(!!error)
            {
                console.log(error);
            }
            else{
                successnote = "Successfully registered";
                errormsg=null;
                console.log("added to db");
                res.redirect('/signup/page');
                
            }
                

        })
        
    }

    })

    
})

module.exports = router;