const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require("body-parser");
const config = require('./config/config.js');
const fsExtra = require('fs-extra')
// Using Middlewares
app.use(bodyParser.json({
    limit: '1mb'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

//Upload file post request
app.post('/api/upload', (req, res) => {
    // clear all files
    
    fsExtra.emptyDirSync(config.uploadDir);

  // upload files
    var images = req.body.uploadedImages;
    images.forEach((element, index) => {
        base64Data = element.replace(/^data:image\/png;base64,/, "");
        // creates new files or replace if already existing
        fs.writeFileSync(`${config.uploadDir}/${index}.png`, base64Data, 'base64', function (err) {
            if (err) console.log(err);
        });
    });

    res.json({
        'message': "Files succesfully uploaded to upload folder"
    });
});

app.get('/api/getImages', (req, res) => {
    fs.readdir(config.uploadDir, (err, data) => {
        res.json({data});
    });
    
})

//Server
app.listen(config.PORT, () => {
    console.log('Listening at ' + config.PORT);
});