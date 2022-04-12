const express = require("express");
const router = express.Router()
const dotenv = require("dotenv");
dotenv.config();


// Configure env file and Require connection file
dotenv.config({ path: "./db/.env" });
require('../connection')
const Users = require("../models/userSchema");

// login

router.post('/', async (req,res) => {

    const { email, password } = req.body;
    
if (email === 'shreehari000@gmail.com' && password === '12345'){
    res.status(200).send('right credentials')
}else{
    res.status(400).send('wrong credentials')
}

})

// fetch userData

router.get('/fetch', async(req,res) => {
    const user = await Users.find()
    if (user){
        res.status(200).json(user)
        let users = await req.headers['id']
    }else{
        res.status(400).send('failed')
    }
})

    // delete userData

router.post('/delete', async(req,res)=> {

    const id = req.body.id
    console.log(req.body, "its body");
    console.log(id, "from delete");
    if (id){
    Users.deleteOne({_id : id}, function (err) {
        if (err) {
            return handleError(err);
        }else{
            res.status(200).send("success")
        }
 
      }) 
        
    }else{
        res.status(400).send("failed")
    }
})

// update userData

router.get('/onedata/:id', async(req,res)=> {
    const id = req.params.id

    if (id){
    Users.findOne({_id : id},(err, data) => {
        if(data) {
            res.status(200).json({ data})
        }else{
            res.status(400).send("failed")
        }
    })

    }else{
        res.status(400).send("failed")
    }
})

router.post('/update', async(req,res)=> {
    console.log("heee entered");

    const id = req.body.id
    const user = req.body.user.username
    const email = req.body.user.email
    console.log(req.body,"its body");
    console.log(user,"its username");
    console.log(id,"its id");
    console.log(email,"its email id");

    if (id){
    Users.updateOne({_id : id},{username: user, email : email}, function (err) {
        if (err) {
            return handleError(err);
        }else{
            console.log('successfully updated');
            res.status(200).send("success")
        }
      }) 
        
    }else{
        res.status(400).send("failed")
    }

})


module.exports = router