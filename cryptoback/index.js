const express = require('express')
require('./db/config')
const cors = require('cors')
const User = require('./db/User')
const Wallet = require('./db/Wallet')
const app = express();
const Jwt = require("jsonwebtoken")
const jwtsecret = "crypto"
const nodeMailer = require('nodemailer')

app.use(cors())
app.use(express.json())
app.post('/register', async (req, resp) => { 
    let userdata = new User(req.body)
     let result = await userdata.save()
    Jwt.sign({ result }, jwtsecret, (err, token) => {
        resp.json({ result, token })
    })
    let transporter = nodeMailer.createTransport({
        service:"gmail",
        auth:{
            user:"guptasunanda33@gmail.com",
            pass: "jdjcqmanmrltajie"
            }
    })
    let mailOptions= {
        from:"guptasunanda33@gmail.com",
        to:result.email,
        subject:"Account create Successfully",
        text:"Welcome to cryptBase Hello user you account has been successfully created."
    }
    transporter.sendMail(mailOptions,(err,res)=>{
        if(err){
            console.log(err);
        }
        else {
             console.log("mail sent")
        }
    });
})


app.post("/login", async (req, resp) => {
    const { email, password } = req.body;
    if (password && email) {
        const user = await User.findOne({ email, password }).select('-password');
        if (user) {
            Jwt.sign({ user }, jwtsecret, (err, token) => {
                resp.send({ user, auth: token });
            });
        } else {
            resp.send('no user');
        }
    } else {
        resp.send('Details not correct');
    }
});
app.post('/add-crypto/:id', verifytoken, async (req, resp) => {
    let result = new Wallet(req.body)
    result = await result.save()
    resp.send(result)
})
app.get('/mywallet', verifytoken, async (req, resp) => {
    const userID = req.query.userID; // Extract the userID from the query parameters
    let products = await Wallet.find({ UserId: userID }); // Adjust the field name as per your schema

    resp.send(products);

});
app.delete('/mywallet/:id', verifytoken, async (req, resp) => {
    const result = await Wallet.deleteOne({ _id: req.params.id })
    resp.send(result)
})


function verifytoken(req, resp, next) {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(' ')[1]

        Jwt.verify(token, jwtsecret, (err, valid) => {
            if (err) {
                resp.send("please provid valid tokon")
            } else {
                next();
            }
        })
    }
    else {
        resp.send("please add token with header")
    }
}

app.listen(5000)