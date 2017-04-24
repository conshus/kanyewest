// $.get( "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC", function( data ) {
//   console.log( data );
// });

// $.getJSON( "https://api.themoviedb.org/3/movie/now_playing?api_key=0928b0fd3a9176a81183d40eac3b7b2b&language=en-US&page=1", function( data ) {
//   console.log( data );
// });
let searchTerm;
function getKanyeGiph(){
$.get( 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=kanye+west', function( data ) {
  console.log( data.data.image_original_url );
  $("#kanyeGiph").addClass("animated zoomInUp");
  $("#kanyeGiph").attr('src', data.data.image_original_url);
});
}

getKanyeGiph();
// $.get( 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=graduation&q_artist=kanye%20west&apikey=ada1c412d492b4b833a5d83987121094', function( data ) {
//   console.log( data );
// });
//
// $.get( 'https://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da?inc=aliases&fmt=json', function( data ) {
//   console.log( data );
// });
//
//
// function callback(){
//   console.log('test');
// }
// $.get( 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=ada1c412d492b4b833a5d83987121094', function( data ) {
//   console.log( data );
// });

function findAlternateVideo(videoId){
  $.get("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyD-ywR2ZNBmGT9MtYinLBPq1PuGi4OTOB4&q="+searchTerm+"&relatedToVideoId="+videoId, function ( data ){
    console.log(data);
    console.log(data.items[0].id.videoId);
    $("#kanyeVideo").attr('src', "https://www.youtube.com/embed/"+data.items[0].id.videoId);
    $( "#kanyeResults" ).show( "fast" );
    $("#kanyeResults").addClass("animated zoomInUp");

  })

}

function youtubeCheck(videoId){
  console.log(videoId);
  $.get("https://www.googleapis.com/youtube/v3/videos?part=contentDetails&key=AIzaSyD-ywR2ZNBmGT9MtYinLBPq1PuGi4OTOB4&id="+videoId, function ( data ){
    console.log(data);
    //console.log(data.items[0].contentDetails.hasOwnProperty('regionRestriction'))
    if ( data.items[0].contentDetails.hasOwnProperty('regionRestriction') ){
      console.log(Object.entries(data.items[0].contentDetails.regionRestriction))
      let allowedOrBlocked = Object.entries(data.items[0].contentDetails.regionRestriction);
      console.log(allowedOrBlocked[0][0]);
      if (allowedOrBlocked[0][0] === "blocked"){
        console.log('video blocked');
        findAlternateVideo(videoId)
      } else {
        console.log('allowed')
        $("#kanyeVideo").attr('src', "https://www.youtube.com/embed/"+videoId);
        $( "#kanyeResults" ).show( "fast" );
        $("#kanyeResults").addClass("animated zoomInUp");
      }
    } else {
      console.log('video not blocked');
      $("#kanyeVideo").attr('src', "https://www.youtube.com/embed/"+videoId);
      $( "#kanyeResults" ).show( "fast" );
      $("#kanyeResults").addClass("animated zoomInUp");
    }
  })
}
function getGeniusInfo (kanyeTrackId){
  $.getJSON( "https://api.genius.com/songs/"+kanyeTrackId+"?access_token=cnXaH5W-ZkVrKrzs39tsbqfG7juReC6Ez8qTP5fxmdhpeOtIPZznQPr0sJmbrK0u", function( data ) {
    console.log( data );
    console.log( data.response.song.album.name );
    console.log( data.response.song.album.cover_art_url );
    console.log( data.response.song.media );
    $("#albumCover").attr('src', data.response.song.album.cover_art_url);
    $("#albumInfo").html(data.response.song.album.name+"<br/> Released: "+data.response.song.release_date)
    for (i=0; i < data.response.song.media.length; i++){
      console.log(data.response.song.media[i].provider)
      if (data.response.song.media[i].provider.toLowerCase() == "youtube"){
        console.log(i);
        let youtubeVideoId = data.response.song.media[i].url.split("v=");
        console.log(youtubeVideoId);
        //$("#kanyeVideo").attr('src', "https://www.youtube.com/embed/"+youtubeVideoId[1]);
        youtubeCheck(youtubeVideoId[1]);
      }
    }
  });

}
function getKanyeInfo (kanyeTrack){
  console.log('kanye track', kanyeTrack);
  searchTerm = "kanye%20west%20"+kanyeTrack;
$.getJSON( "https://api.genius.com/search?q=kanye%20west%20"+kanyeTrack+"&access_token=cnXaH5W-ZkVrKrzs39tsbqfG7juReC6Ez8qTP5fxmdhpeOtIPZznQPr0sJmbrK0u", function( data ) {
  // console.log( data );
  // console.log( data.response.hits[0].result.id );
  // console.log( data.response.hits[0].result.title );
  // console.log( data.response.hits[0].result.header_image_url );
  getGeniusInfo(data.response.hits[0].result.id);
});
}

$( "#clickme" ).click(function() {
  $( "#intro" ).slideUp("slow");
});
$( "#restart" ).click(function() {
  $( "#intro" ).slideDown("slow");
  getKanyeGiph();
  getQuotesForSection(1);
});

//$.getJSON( "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=kanye+west+graduation+day&topicId=UCRY5dYsbIN5TylSbd7gVnZg&type=video&videoDefinition=any&videoEmbeddable=true&key=AIzaSyD-ywR2ZNBmGT9MtYinLBPq1PuGi4OTOB4", function( data ) {
  //console.log( "youtube data" );
  //console.log( data );
//});

// $.get("https://www.google.com/search?q=%http://www.kanyerest.xyz/api/album/yeezus&btnI=Im+Feeling+Lucky", function (data){
//   console.log(response);
// })


// $.getJSON( "https://api.genius.com/songs/378195?access_token=cnXaH5W-ZkVrKrzs39tsbqfG7juReC6Ez8qTP5fxmdhpeOtIPZznQPr0sJmbrK0u", function( data ) {
//   console.log( data );
// });
//
// $.get("//www.kanyerest.xyz/api/album/yeezus", function (data){
//   console.log(response);
// })


// fetch("//www.kanyerest.xyz/api/album/yeezus", {mode: 'no-cors'})
// .then(function(response) {
//   console.log(response);
// })
