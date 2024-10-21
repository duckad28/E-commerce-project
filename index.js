const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const path = require('path');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var flash        = require('express-flash');
var methodOverride = require('method-override');

// user define
const database = require('./config/database');
const clientRoute = require('./routes/client/index.route');
const adminRoute = require('./routes/admin/index.route');

// declare var
const PORT = process.env.PORT;
const viewsPath = path.join(__dirname, '/views');
const staticPath = path.join(__dirname, '/public');

// app config
database.connect();
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', viewsPath);
app.set('view engine', 'pug');
app.use('/static', express.static(staticPath));
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(methodOverride('_method'));

// Run app
clientRoute(app);
adminRoute(app);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})