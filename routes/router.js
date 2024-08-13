const express = require('express');
const router = express.Router();
const db = require('../db/dbconnection')

// Home PAge
router.get('/', function(req, res){
    res.render('index');
})

//Login Page -- get
router.get('/login',function(req, res){
    res.render('loginpage');
})

//Login Page -- post
router.post('/login', function(req, res){
    const{user, pass} = req.body;
    if(user == 'pritesh' && pass == 'iacsd'){
        res.redirect('/studentList');
    }else{
        res.redirect('/login');
    }
})

//Student List 
router.get('/studentList', function(req, res){
    db.query('select * from stud',function(err, data){
        if(err){
            res.send('data not found');
        }else{
            res.render('display', {student:data})
        }
    })
})

//Registration Page -- get
router.get('/register',function(req, res){
    res.render('addstudent');
})

//Registration Page -- post
router.post('/register',function(req, res){
    db.query('insert into stud values(?,?,?)',[req.body.id, req.body.name, req.body.marks],function(err, result){
        if(err){
            res.send('error occured')
        }else{
            if(result.affectedRows > 0){
                res.redirect('/studentList')
            }
        }
    })
})

router.get('/deletestudent/:id', function(req, res){
    db.query('delete from stud where id=?',[req.params.id], function(err, result){
        if(err){
            console.log('nothing deleted')
        }else{
            if(result.affectedRows > 0){
                res.redirect('/studentList')
            }
        }
    })
})

router.get('/editstudent/:id',function(req,res){
    db.query('select * from stud where id=?',[req.params.id],function(err,data){
       if(err){
           res.send('data not found')
       }else{
           if(data.length > 0){
               res.render('update',{student:data[0]})
           }
       }
    })
})

//data will get updated in the database
router.post('/editstudent',function(req,res){
    db.query('update stud set name=?,marks=?  where id=?',[req.body.name,req.body.marks,req.body.id],function(err,result){
        if(err){
            res.send("no data updated")
        }else{
            res.redirect('/studentList');
        }
    })
})

module.exports = router;

