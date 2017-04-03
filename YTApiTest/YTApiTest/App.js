  var http = new XMLHttpRequest();
  var apiKey = 'AIzaSyDC3U6v0lQRhru-aOSajXtGfjkjx6CDOow';
  var fiveDeep = 'CGQQAA';
  var tenDeep = 'CMgBEAA';
  var data, data2;
  var idString = '';
  var sortedArray = [];

  var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&pageToken=CMgBEAA&q=canada&type=video&key=' +apiKey;

  var method = 'GET';

  http.open(method, url, true);
  http.onreadystatechange = function (){

    if (http.readyState == XMLHttpRequest.DONE && http.status === 200){
      data = JSON.parse(http.responseText);

    } else if (http.readyState === XMLHttpRequest.DONE) {
      alert('Something went wrong, try again');
    }
    // console.log(data.items[0].id.videoId);
    // console.log(data);

  var videoIdArray = [];

    for(i=0; i<50; i++){
      videoIdArray[i] = data.items[i].id.videoId;
      idString = idString.concat(videoIdArray[i] + ',');
      // console.log(videoIdArray[i]);
    };

    idString = idString.slice(0,-1);
    // console.log(idString);
  };

  http.send();
  
  setTimeout(secondRequest, 3000);

  function secondRequest(){
    var xhr = new XMLHttpRequest();
    var url = 'https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=' + idString + '&key=' +apiKey;
    var method = 'GET';

    xhr.open(method, url);
    xhr.onreadystatechange = function (){
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200){
        data2 = JSON.parse(xhr.responseText);

      } else if (xhr.readyState === XMLHttpRequest.DONE) {
         alert('Something went wrong, try again');
      }
      // console.log(data2.items[0].id.videoId);
      console.log(data2);
      sortVideos(data2);
    };
    xhr.send();
  }

  function sortVideos(data2){

    for (i = 0; i < data2.items.length; i++){

      // console.log(data2.items[i].snippet.description);

      if (data2.items[i].statistics.likeCount > 10 && data2.items[i].statistics.dislikeCount < (0.1 * data2.items[i].statistics.likeCount)
        && data2.items[i].statistics.viewCount < 20000) {
        console.log(data2.items[i].snippet.title);
        console.log(data2.items[i].statistics.likeCount);
        console.log(data2.items[i].statistics.dislikeCount);
      }

      // if (data2.items[i].statistics.favoriteCount > 0) {
      //   console.log(data2.items[i].statistics);
      // }
    }

  }


