const express = require('express');
const cors = require('cors');
const cheerio = require("cheerio");
const axios = require('axios');
const data = require('./utils/data')
const fetch1 = require('./fetch')
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json())

app.get('/', async (req,res)=>{
    await fetch1();
    res.status(200).send({status:200,msg:"success",data:data})
})

app.post('/summary',(req,res)=>{
    console.log(req.body);
    const commentry = req.body.txt_data;
    let summary = '';

    const options = {
    method: 'POST',
    url: 'https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'db553e6076msh6431e04f8d54b9ep1c4067jsna3eb30d8d7c2',
        'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
    },
    data: `{"language":"english","summary_percent":10,"text":${JSON.stringify(commentry)}}`
    };

    axios.request(options).then(function (response) {
        summary = response.data.summary
        summary.length==0?summary=commentry:summary
        res.status(201).send({status:201,msg:"posted",summary})
    }).catch(function (error) {
        console.error(error);
        res.status(201).send({status:404,msg:"not found",summary})
    });
    
})

app.listen(PORT,console.log(`server is listening on PORT ${PORT}`))