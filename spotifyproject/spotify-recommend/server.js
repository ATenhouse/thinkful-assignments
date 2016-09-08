var unirest = require('unirest');
var express = require('express');
var events = require('events');

var getFromApi = function(endpoint, args) {
    var emitter = new events.EventEmitter();
    unirest.get('https://api.spotify.com/v1/' + endpoint)
           .qs(args)
           .end(function(response) {
                if (response.ok) {
                    emitter.emit('end', response.body);
                }
                else {
                    emitter.emit('error', response.code);
                }
            });
    return emitter;
};

var getRelatedArtists = function(artistID, args) {
    var emitter = new events.EventEmitter();
    console.log("https://api.spotify.com/v1/artists/" + artistID + '/related-artists');
    unirest.get('https://api.spotify.com/v1/artists/' + artistID + '/related-artists')
           .qs(args)
           .end(function(response) {
                if (response) {
                    emitter.emit('end', response.body);
                }
                else {
                    emitter.emit('error', response.code);
                }
            });
    return emitter;
};

var app = express();
app.use(express.static('public'));

app.get('/search/:name', function(req, res) {
    var searchReq = getFromApi('search', {
        q: req.params.name,
        limit: 1,
        type: 'artist'
    });
    searchReq.on('end', function(item) {
        var artist = item.artists.items[0];
        console.log(artist.id);
        var related_artist = getRelatedArtists(artist.id);

        related_artist.on('end', function(item){
            var related = item.artists;
        });

        related_artist.on('error', function(item){
            console.log("Error thrown:" + item);
        });

        res.json(artist);
    });

    searchReq.on('error', function(code) {
        res.sendStatus(code);
    });
});

app.listen(process.env.PORT || 8080);