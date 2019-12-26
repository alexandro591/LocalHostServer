const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require("body-parser");

const localhostserver = express();
const router = express.Router();


localhostserver.use(express.static('public'));
localhostserver.use(bodyParser.urlencoded({ extended: false }));
localhostserver.use(bodyParser.json());

router.get('/notifymeapp/',(request,response)=>{
    response.write("LocalhostServer\n");
    response.write("Your email is: "+request.query.name); 
    response.end();
});

router.post('/',function(request,response){
});

localhostserver.use('/.netlify/functions/index',router);

module.exports.handler = serverless(localhostserver);
