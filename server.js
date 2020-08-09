if(process.env.NODE_ENV !== "production"){ //check if not running in the production environment
    require('dotenv').config();
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout'); //set up default layout for every pages

app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}); //Mongoose provides options to work around these deprecation warnings
const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('comnected to Mongoose'));

app.use(indexRouter);

app.listen(process.env.PORT || 3000);