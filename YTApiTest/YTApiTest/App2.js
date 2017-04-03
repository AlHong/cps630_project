  var http = new XMLHttpRequest();
  var apiKey = 'AIzaSyDC3U6v0lQRhru-aOSajXtGfjkjx6CDOow';
  var nextPageToken = '';
  // var data, data2;
  var idString = '';
  var sortedArray = [];
  var method = 'GET';
  var sortedCounter = 0;

  function initialFetch(){
    var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&pageToken='+nextPageToken+'&q=kobe&type=video&key='+apiKey;
    idString = '';
    http.open(method, url, true);
    http.onreadystatechange = function (){

    if (http.readyState == XMLHttpRequest.DONE && http.status === 200){
      var data = JSON.parse(http.responseText);
      nextPageToken = data.nextPageToken;
      console.log(data);
      console.log(nextPageToken);

      var videoIdArray = [];

        for(i=0; i<50; i++){
          videoIdArray[i] = data.items[i].id.videoId;
          idString = idString.concat(videoIdArray[i] + ',');
          // console.log(videoIdArray[i]);
        };

    } else if (http.readyState === XMLHttpRequest.DONE) {
      alert('Something went wrong, try again');
    }

    idString = idString.slice(0,-1);
    // console.log(idString);
  };

    http.send();

  }

  function secondRequest(){
    var xhr = new XMLHttpRequest();
    var url = 'https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=' + idString + '&key=' +apiKey;
    var method = 'GET';
    var data2;

    xhr.open(method, url);
    xhr.onreadystatechange = function (){
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200){
        data2 = JSON.parse(xhr.responseText);
        // console.log(data2.items[0].id.videoId);
        console.log(data2);
        sortVideos(data2);

      } else if (xhr.readyState === XMLHttpRequest.DONE) {
         alert('Something went wrong, try again');
      }
    };
    xhr.send();
  }

  function sortVideos(data2){

    for (i = 0; i < data2.items.length; i++){

      // console.log(data2.items[i].snippet.description);

      if (data2.items[i].statistics.likeCount > 20 && data2.items[i].statistics.dislikeCount < (0.1 * data2.items[i].statistics.likeCount)
        && data2.items[i].statistics.viewCount < 20000) {
        console.log(data2.items[i].snippet.title);
        console.log(data2.items[i].statistics.likeCount);
        console.log(data2.items[i].statistics.dislikeCount);
        sortedArray.push(data2.items[i].id);
        sortedCounter++;

      }

      if (data2.items[i].statistics.favoriteCount > 0) {
        // console.log(data2.items[i].statistics);
      }
    }
    
    console.log('Number of sorted videos: ' + sortedCounter);
    console.log('Sorted Array: ' + sortedArray)

  }

  	var deeperSearch = function(){

  		setTimeout(initialFetch, 2000);
        setTimeout(secondRequest, 3000);
  	}

  	//initial search
  	initialFetch();
  	setTimeout(secondRequest, 1000);


  	//subsequent searches
  	setTimeout(deeperSearch, 3000);
  	setTimeout(deeperSearch, 8000);


