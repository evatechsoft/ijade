var express = require('express'),
    server = express(),
    bodyParser = require('body-parser'),
    pub = __dirname + '/static/',
    views = __dirname + '/views',
    html2jade= require('html2jade');


// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
server.use(bodyParser.json())
// parse application/vnd.api+json as json
server.use(bodyParser.json({ type: 'application/vnd.api+json' }))
server.use(express.static(pub));

server.set('view engine', 'jade');
server.set('views', views);

if (server.get('env') === 'development') {
    server.locals.pretty = true;
}

server.post('/convert', function (req, res) {
    var html = req.body.html;
    html2jade.convertHtml(html, {}, function (err, jade) {
        res.json({ jade: jade });
    });
});

server.get('/', function (req, res) {
    res.render('index');
});
server.get('/contact', function (req, res) {
    res.render('index');
});
server.get('/about', function (req, res) {
    res.render('index');
});
var PORT = process.env.PORT || 3000;
server.listen(PORT);
console.log("Server started at http://localhost:" + PORT)