/**
 * Created by Jordan3D on 5/24/2018.
 */
const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const port = process.env.port || 8080,
    ip = process.env.proxy || '0.0.0.0';

const https = require('https');
const parseHtml = require('node-html-parser').parse;

app.use(express.static('./'));
app.get('/images/:query', function(req,res){
    var query = req.params.query;
    console.log(encodeURI(query));

    https.get(`https://www.google.com.ua/search?q=${encodeURI(query)}&source=lnms&tbm=isch&sa=X&ved=0ahUKEwi09djhmKPbAhWRJVAKHdufDKUQ_AUICygC&biw=1280&bih=893`, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            const parsedHTML = parseHtml(data);

            const images = parsedHTML.querySelectorAll('img');

            const imagesSrc = images.map((i)=> ({src: i.rawAttributes.src})).slice(1);

            res.send(JSON.stringify({data: imagesSrc}));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

http.listen(port, ip, function () {
    console.log(`App is listening on *:${port}`);
    // console.log(matchShort.getLatestMatch());
});
