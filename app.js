require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const { error } = require('console');
const filepath = path.join(__dirname,'/public/images');



/*---------------- Middlewares -----------------*/

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));



/*------------------ Images Routes----------------- */

app.use('src/public/images',express.static(filepath));
const appRoutes = require('./src/router/user/index.routes');
const appliRoutes = require('./src/router/admin/index.routes');

/*--------------Application Routes------------------- */
app.use('/apis/user',appRoutes)
app.use('/apis/admin',appliRoutes)



/*------------- Server & DB Connection---------------- */

app.listen(port ,async() =>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("DB is connected..")) 
    .catch((error)=> console.log(error));
    console.log(`Server is Listening on http://localhost:${port}`);
})