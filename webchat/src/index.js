const express = require('express');
const { createServer } = require('http');
const realtimeServer = require('./realtimeServer');

const path = require('path');
const cookieParser = require('cookie-parser'); //cookies

const app = express();
const httpServer = createServer(app);

// settings
app.set('port', process.env.PORT || 9300);
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());


// routes
app.use(require('./routes'));

//public
app.use(express.static(path.join(__dirname, 'public')));

// server on
httpServer.listen(app.get('port'), ()=>{
    console.log('listening on ', app.get('port'));
});

// call server socket.io
realtimeServer(httpServer);