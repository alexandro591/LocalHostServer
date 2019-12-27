const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;


const localhostserver = express();
const router = express.Router();


localhostserver.use(express.static('public'));
localhostserver.use(bodyParser.urlencoded({ extended: false }));
localhostserver.use(bodyParser.json());

const uri = "mongodb+srv://alexandro591:elhuevo591@cluster0-qjud5.mongodb.net/test?retryWrites=true&w=majority";



async function main(){
    const client = new MongoClient(uri);
    try {
        await client.connect(); 
        await  listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(" - "+db.name);
        if(db.name=="notifymeapp"){
            console.log("sila")
            db.collection('users').insertOne({
                Employeeid: 4,
                EmployeeName: "NewEmployee"
            });
        }
        
    });
};


router.get('/notifymeapp/',(request,response)=>{
    response.write("LocalhostServer\n");
    response.write("Your email is: "+request.query.name);
    main().catch(console.err);

    response.end();
    
});

router.post('/',function(request,response){
});

localhostserver.use('/.netlify/functions/index',router);

module.exports.handler = serverless(localhostserver);
