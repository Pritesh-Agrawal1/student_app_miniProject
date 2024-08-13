const mysql = require('mysql2');

var cn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'iacsd@123',
    database:'expdemo',
    port:3306
})

cn.connect((err)=>{
    if(!err){
        console.log('connection done');
    }else{
        console.log(err);
    }
})

module.exports = cn;