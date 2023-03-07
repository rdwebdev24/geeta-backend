const express = require('express');
const cors = require('cors');
const data = require('./utils/data')
const fetch1 = require('./fetch')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/', async (req,res)=>{
    await fetch1();
    res.status(200).send({status:200,msg:"success",data:data})
})


app.listen(PORT,console.log(`server is listening on PORT ${PORT}`))