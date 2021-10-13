var lastfmData = {
    baseURL:
      "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
    user: "thatMint",
    yenah: "4f3da8a496ea9fb7506da00235cd1710",
    additional: "&format=json&limit=1"
  };
  
  var setfm = function() {
    $.ajax({
      type: "GET",
      url:
        lastfmData.baseURL +
        lastfmData.user +
        "&api_key=" +
        lastfmData.yenah +
        lastfmData.additional,
      dataType: "json",
      success: function(resp) {
        var recentTrack = resp.recenttracks.track[0];
        var formatted =
          "<img src='https://i.imgur.com/EgWjJry.png'>" + recentTrack.name.toLowerCase();
        $("a#tracktitle")
          .html(formatted)
          .attr("href", recentTrack.url)
          .attr("title", recentTrack.name.toLowerCase() + " by " + recentTrack.artist["#text"].toLowerCase())
          .attr("target", "_blank");
  
        var artistFormatted =
          "<img src='https://i.imgur.com/fae5XZA.png'>" +
          recentTrack.artist["#text"].toLowerCase();
        $("a#trackartist")
          .html(artistFormatted)
          .attr("title", "artist: " + recentTrack.artist["#text"].toLowerCase());
        $("img#trackart").attr("src", recentTrack.image[2]["#text"].toLowerCase());
      },
      error: function(resp) {
        $("a#tracktitle").html(
          "<img src='https://i.imgur.com/EgWjJry.png'>" + "probably off air."
        );
        $("img#trackart").attr("src", "https://i.imgur.com/Q6cCswP.jpg");
        var artistFormatted =
          "<img src='https://i.imgur.com/fae5XZA.png'>see you next time.";
        $("a#trackartist")
          .html(artistFormatted)
          .attr("href", "/");
      }
    });
  };
  
  setfm();
  setInterval(setfm, 10 * 1000);