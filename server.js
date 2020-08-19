if(process.env.NODE_ENV !== "production"){ //check if not running in the production environment
    require('dotenv').config(); //dotenv allows us to  load the environment variables into our app  //load all variables in .env file in development environment
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bodyParser = require('body-parser'); //bodyParser make it easier to access different input elements from our actual server 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); //set up views , link to the files will be rendered
app.set('layout', 'layouts/layout'); //set up default layout for every pages

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}); //Mongoose provides options to work around these deprecation warnings
const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('comnected to Mongoose'));

app.use(indexRouter);
app.use('/authors', authorRouter);

app.listen(process.env.PORT || 3000);