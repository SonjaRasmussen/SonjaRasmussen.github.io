const express = require('express');
const bodyParser = require('body-parser');



const nodemailer = require('nodemailer');

const app = express()
const port = 8000

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
            user:GMAIL_USER,
            pass: GMAIL_PASS
        }
    });

mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + "&gt",
    to: GMAIL_USER,
    subject: "New message from contact form at Sonja Rasmussen",
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
};
smtpTrans.sendMail(mailOpts, function(error, response){
    if(error){
        res.render('contact-failure');
    }
    else{
        res.render("contact-success");
    }
});
});

app.listen(port, ()=> console.log("App is listening on port" + ${port}))
