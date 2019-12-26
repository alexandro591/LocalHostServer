const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');

const notifyMe = express();
const router = express.Router();


notifyMe.use(express.static('public'));
notifyMe.use(bodyParser.urlencoded({ extended: false }));
notifyMe.use(bodyParser.json());

router.get('/',(request,response)=>{

});

router.post('/',function(request,response){
    response.header('Access-Control-Allow-Origin' , '*' );
    var to=request.body.to;
    var subject=request.body.subject;
    var text="emailXXX"+to+"XXX"+" "+"appYYY"+subject+"YYY"+" "+"notificationZZZ"+request.body.text+"ZZZ";
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        tls: {
            secure: true
        },
        secureConnection: true,
        port: 465,
        auth:{
                user: 'notifymelocalhost@gmail.com',
                pass: 'elhuevo591',
        }
    });
    const mailOptions = {
        from: 'notifymelocalhost@gmail.com', // sender address
        to: 'notifymelocalhost@gmail.com', // list of receivers
        subject: subject, // Subject line
        html: text// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
    response.write("success");
    response.end();
});

notifyMe.use('/.netlify/functions/notifyMe',router);

module.exports.handler = serverless(notifyMe);
