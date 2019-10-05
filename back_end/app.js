let express = require('express');
let mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'test_board',
    password: '1234',
    database: 'express_vuetify_board'
})

try {
    connection.connect();
}
catch(err) {
    console.log(err);
}

var app = express();

app.get('/', function(req, res) {
    res.send('root');
});

app.get('/list', function(req, res) {
    let query = 'select * from board';

    let result = connection.query(query, function(error, result, fields) {
        console.log(error, result, fields);
        res.send(result)
    });

    console.log(result);
});

app.get('/write', function(req, res) {
    let contents = "hello";
    let writer_id = "zkunsang"
    let password = "1234"
    let write_date = new Date();
    let update_date = new Date();
    let view_yn = "Y";
    console.log(write_date);
    console.log(connection.escape(write_date))
    let query = `insert into board(contents, writer_id, write_password, write_date, view_yn)`
        + ` values('${contents}', '${writer_id}', '${password}', ${connection.escape(write_date)}, '${view_yn}')`

    let result = connection.query(query, function(error, result, fields) {
        console.log(error, result, fields);
        res.send(result)
    });
    
});

app.get('/read', function(req, res) {
    let writer_id = "zkunsang"
    let query = `select * from board where writer_id = '${writer_id}'`

    connection.query(query, function(error, result, fields) {
        console.log(error, result, fields);
        res.send(result);
    });
});

app.get('/delete', function(req, res) {
    let query = "delete from board"
    connection.query(query, function(error, result, fields) {
        console.log(error, result, fields);
        res.send(result);
    });
});

app.get('/update', function(req, res) {
    let new_date = new Date();
    let writer_id = "zkunsang";

    let query = `update board set update_date = ${connection.escape(new_date)} where writer_id = '${writer_id}'`
    connection.query(query, function(error, result, fields) {
        console.log(error, result, fields);
        res.send(result);
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})