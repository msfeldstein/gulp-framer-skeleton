var clientID = "1ced9749f8b4bc3b21c33b70c9006e46";

SC.initialize({
  client_id: clientID,
  redirect_uri: "http://example.com/callback.html",
});

module.exports = {
  search: function(q, cb) {
    SC.get('/tracks', { q: q }, function(tracks) {
      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stream_url = track.stream_url + "?client_id=" + clientID;
      }
      cb(tracks);
    });
  }
}
