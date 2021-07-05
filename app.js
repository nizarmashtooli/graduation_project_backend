require('dotenv').config()
const express=require('express');
const mongoose = require('mongoose');
const signinRouter = require('./routers/signinRouter');
const userRouter = require('./routers/userRouter');
const adminBroRouter = require('./routers/adminBroRouter');
const analysisResultRouter = require('./routers/analysisResultRouter');
const cors = require('cors');

const port = process.env.port;
const connectionURL = process.env.connectionURL;

const app = express();
mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex :true})//connect the DB
.then((result) => {
  app.listen(port , () => console.log(`twitter-analysis-app listening on port ${port}!`));//listen to requests
})
.catch((err) => console.log(err));


app.use(express.json());
app.use(cors());//needed to allow frontend communicate with the server
app.use(signinRouter);//check if user ask one of sign in routers
app.use(userRouter);//check if user ask one of user routers
app.use(analysisResultRouter);//check if user ask one of analysis result routers
app.use('/admin',adminBroRouter);//admin panel





