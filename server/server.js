const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require("./config/dbconnection");
const errorHandler = require("./middleware/errorhandler");
const contactRouter =   require('./routes/contact-routes');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user-routes');


const app = express();
app.use(bodyParser.json());



const port = process.env.PORT || 5000;



app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});