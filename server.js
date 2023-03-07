const express = require('express');
const cors = require('cors');
const cheerio = require("cheerio");
const axios = require('axios');
const random = require('./utils/random')
const data = require('./utils/data')

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/', async (req,res)=>{
    await require('./fetch');
    console.log(data);
    console.log('aa gya');
    res.status(200).send({status:200,msg:"success",data:data})
})


app.listen(PORT,console.log(`server is listening on PORT ${PORT}`))