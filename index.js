const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const path = require('path');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
const passport = require('passport');
var flash        = require('express-flash');
var methodOverride = require('method-override');
const { Server } = require('socket.io');
const http = require('http');
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
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// passport
app.use(session({
  secret : process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

app.use(passport.initialize());
app.use(passport.session());
//
// socket io
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});
// socketend

// Run app
clientRoute(app);
adminRoute(app);

server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})