var express = require('express'),
    fs = require('fs'),
    app = express();
require('express-ws')(app);

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/worker.js', function (req, res) {
    res.sendFile(__dirname + '/speedtest_worker.js');
});

app.get('/dev/null', function (req, res) {
    res.sendFile('/dev/null');
});

app.post('/dev/null', function (req, res) {
    req.pipe(fs.createWriteStream('/dev/null'));
});

app.get('/dev/urandom', function (req, res) {
    fs.createReadStream('/dev/urandom').pipe(res);
});

app.get('/favicon.ico', function(req, res) {
    res.sendFile('/dev/null');
});

app.ws('/echo', function (ws, req) {
    ws.on('message', function (msg) {
        ws.send(msg);
    });
});

app.listen(80, function () {
    console.log('Server listening on port 80');
});
