const http = require('http');
const fs = require('fs');
const multer = require('multer')
 const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, 'image' + '-' + file.originalname)
    }
});

let upload = multer ({storage:storage}).single("image")
const server = http.createServer(function(req, res) {
    if (req.url == '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>this is home page</h1>');
        res.end();
    } else if (req.url == '/about') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>this is about page </h1>');
        res.end();
    } else if (req.url == '/contact') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>this is contact page </h1>');
        res.end();
    } else if (req.url == '/file-write') {
        fs.writeFile('demo.txt', 'hello world', function(err) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write('file not created');
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<h1>this is file creating page </h1>');
                res.end();
            }
        });
      } else if (req.method === 'POST' && req.url === '/upload') {
        // Handle file upload
        upload(req, res, (error) => {
            if (error) {
                console.log('something wrong')
                return res.end('Error uploading file');
            } else {
                res.end('File Uploaded Successfully')
            }
        });
    }

});

server.listen(5500, function() {
    console.log('server is running successfully...');
});
