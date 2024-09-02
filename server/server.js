const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require("./config/dbconnection");
const errorHandler = require("./middleware/errorhandler");
const contactRouter =   require('./routes/contact-routes');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user-routes');
const loginRouter = require('./routes/auth-routes');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());


const port = process.env.PORT || 3001;



app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', loginRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});