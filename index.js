const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const superagent = require('superagent');
const speech = require('google-speech-api');



const app = express();

app.use(bodyParser.json());

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('log: Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});


app.post('/webhook', (req, res) => {
    console.log(req.body)
    if(req.body.event === 'call.ended' && req.body.data.voicemail){
        // must specify the filetype when piping
        var opts = {filetype: 'wav'};
        var url = req.body.data.voicemail;

        superagent
          .get(url)
          .pipe(speech(opts, function (err, results) {
            console.log('err',err)
            console.log('results',results)
            
          }));
    }
    
    
});

