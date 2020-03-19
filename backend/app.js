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
//app.use(express.static(__dirname+'/uploads'));

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
    let imgSrcArray = [];
    let index = 0;
    fs.readdir(config.uploadDir, (err, data) => {
        if(err) console.log(err);
        //res.json({data});
        data.forEach((err, file) => {
            fs.readFile(`uploads/${file}.png`, (err, file) => {
                index++;
                let base64Image = new Buffer(file, 'binary').toString('base64');
                //combine all strings
                let imgSrcString = `data:image/png;base64,${base64Image}`;
                imgSrcArray.push(imgSrcString);
                if(index == data.length) {
                    res.json({imgSrcArray});
                }                        
            });
        });
    });
})

//Server
app.listen(config.PORT, () => {
    console.log('Listening at ' + config.PORT);
});