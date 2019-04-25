require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res)=> res.send("Hello World"))

//Post route from contact form
app.post('/contact', function(req, res){
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    console.log("user: ", process.env.GMAIL_USER);
    console.log("pass: ", process.env.GMAIL_PASS);
mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + "&gt;",
    to: process.env.GMAIL_USER,
    subject: "New message from contact form at Sonja Rasmussen",
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
};
smtpTrans.sendMail(mailOpts, function(error, response){
    if(error) {
        console.log("Error: " + error);
    }
    res.redirect("https://sonjarasmussen.github.io/");
});
});

app.listen(port, ()=> console.log("App is listening on port " + port))
