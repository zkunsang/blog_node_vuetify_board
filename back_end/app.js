let express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('root');
});

app.get('/list', function(req, res) {
    res.send('list');
});

app.get('/write', function(req, res) {
    res.send('write');
});

app.get('/read', function(req, res) {
    res.send('read');
});

app.get('/delete', function(req, res) {
    res.send('delete');
});

app.get('/update', function(req, res) {
    res.send('update');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})