var express = require('express');
var router = express.Router();
const {promiseDb} = require('../lib/promiseDb')
const {v4: uuidv4} = require('uuid');

router.post('/registerMember', async function(req, res, next) {
    try{
        let name = req.body.name
        let email = req.body.email
        let birthday = req.body.birthday
        let lineUid = req.body.lineUid
        let checkMemberExistByEmail = await promiseDb(`SELECT * FROM member WHERE Email = ?`,[email])
        if(checkMemberExistByEmail.length==0){
            let InsertMember = await promiseDb(`INSERT INTO member 
                                (MemberId, MemberName, Email, Password, Birthday, LineUid,FacebookUid) 
                                VALUES (?,?,?,?,?,?,?)`,[uuidv4(),name,email,'',birthday,lineUid,''])

        }else{
            //update
        }

        res.send('ok');

    }catch(err){
        console.log(err)
        res.send('fail')
    }

});

router.post('/getMemberExistByLineUid',async function(req,res,next){
    try{
        let lineUid = req.body.lineUid
        let queryMemberByEmail = await promiseDb(`SELECT * FROM member WHERE LineUid = ?`,[lineUid])
        if(queryMemberByEmail.length==1){
            res.json(queryMemberByEmail)
        }else if(queryMemberByEmail.length == 0){
            res.send('not exist')
        }
    }catch(err){
        console.log(err)
        res.send(err)
    }
})


module.exports = router;