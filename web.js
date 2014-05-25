var express = require('express'),
    server = express(),
    pub = __dirname + '/static/',
    views = __dirname + '/views',
    html2jade;
var bodyParser = require('body-parser')
try {
	html2jade = require('html2jade');
} catch (err) {
	console.log('Failure to load \'html2jade\' module');
	html2jade = require('./node_modules/html2jade/lib/html2jade')
}

server.use(bodyParser());
server.use(express.static(pub));
server.set('view engine', 'jade');
server.set('views', views);

server.post('/convert', function (req, res) {
	var html = req.body.html;

    html2jade.convertHtml(html, {}, function (err, jade) {
        res.json({ jade: jade });
    });
});

server.get('/', function (req, res) {
    res.render('index', {pretty:true});
});

var ser = server.listen(process.env.PORT || 3000, function(){
    console.log('Express server listening on port ' + ser.address().port);
});
