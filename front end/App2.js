var http = new XMLHttpRequest();
var apiKey = 'AIzaSyDC3U6v0lQRhru-aOSajXtGfjkjx6CDOow';
var nextPageToken = '';
// var data, data2;
var idString = '';
var sortedArray = [];
var method = 'GET';
var sortedCounter = 0;
var input, url, videoDetails, iframe, stats, element, firstData;
var videoIdArray = [];

updateString = function() {
  idString = '';
  for(i = 0; i < 50; i++){
    videoIdArray[i] = firstData.items[i].id.videoId;
    idString = idString.concat(videoIdArray[i] + ',');
    // console.log(videoIdArray[i]);
  };
  idString = idString.slice(0,-1);
}

function searchInput(e){

  sortedArray = [];
  sortedCounter = 0;
  idString= '';
  nextPageToken = '';

  if(e.keyCode === 13){
    e.preventDefault();
    input = document.getElementById("search").value;
    //Clears all the search results
    if (videoDetails) {
      $( ".list-group" ).empty();
    }

    //First API search list call
    url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&pageToken='+nextPageToken+'&q=' + input + '&type=video&key='+apiKey;
    $.get(url).then(function(data){
        nextPageToken = data.nextPageToken;
        console.log(data);
        console.log(nextPageToken);
        firstData = data;
        updateString();
        var url2 = 'https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=' + idString + '&key=' +apiKey;
        url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&pageToken='+nextPageToken+'&q=' + input + '&type=video&key='+apiKey;
    //First video list API call
        return $.get(url2);
    }).then(function(data2){
        console.log(data2);
        sortVideos(data2);
    //Second API search call
      return $.get(url);
    }).then(function(dataSearch){
        nextPageToken = dataSearch.nextPageToken;
        console.log(dataSearch);
        console.log(nextPageToken);
        firstData = dataSearch;
        updateString();
        var url2 = 'https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=' + idString + '&key=' +apiKey;
        url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&pageToken='+nextPageToken+'&q=' + input + '&type=video&key='+apiKey;
    //Second video list API call
        return $.get(url2);
    }).then(function(data2){
        console.log(data2);
        sortVideos(data2);
    //Third API search call
        return $.get(url);

    }).then(function(dataSearch){
        nextPageToken = dataSearch.nextPageToken;
        console.log(dataSearch);
        console.log(nextPageToken);
        firstData = dataSearch;
        updateString();
        var url2 = 'https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=' + idString + '&key=' +apiKey;
        url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&pageToken='+nextPageToken+'&q=' + input + '&type=video&key='+apiKey;
    //Third video list API call
        return $.get(url2);
    }).then(function(data2){
        console.log(data2);
        sortVideos(data2);
    //Fourth API search call
        return $.get(url);
    }).then(function(){

      if(sortedCounter === 0) {
        var errorElement = document.getElementById("errorElement");
        errorElement.innerHTML = "Sorry, found no overlooked videos, perhaps try an advanced search with different parameters";
      }

    }) // end of promises

  }
}


function sortVideos(data2){

  for (i = 0; i < data2.items.length  &&  data2.items[i].statistics != undefined; i++){

    // console.log(data2.items[i].snippet.description);

    if (data2.items[i].statistics.likeCount > 20 && data2.items[i].statistics.dislikeCount < (0.1 * data2.items[i].statistics.likeCount)
      && data2.items[i].statistics.viewCount < 10000) {
      // console.log(data2.items[i].snippet.title);
      // console.log(data2.items[i].statistics.likeCount);
      // console.log(data2.items[i].statistics.dislikeCount);
      sortedArray.push(data2.items[i].id);
      sortedCounter++;

      element = document.getElementById("div1");
      videoDetails = document.createElement("li");
      iframe = document.createElement("iframe");
      stats = document.createElement("div");

      var divAt = document.createAttribute("class");
      var att = document.createAttribute("class");
      var att2 = document.createAttribute("src");
      var width = document.createAttribute("width");
      var height = document.createAttribute("height");
      var fs = document.createAttribute("allowfullscreen");
      fs.value = "allowfullscreen";

      divAt.value="stats";
      stats.setAttributeNode(divAt);

      att.value = "list-group-item";
      videoDetails.setAttributeNode(att);
      att2.value = "https://www.youtube.com/embed/" + data2.items[i].id;
      width.value = "450";
      height.value = "350";
      iframe.setAttributeNode(att2);
      iframe.setAttributeNode(width);
      iframe.setAttributeNode(height);
      iframe.setAttributeNode(fs);
      videoDetails.innerHTML = data2.items[i].snippet.title + "</br>" ;
      stats.innerHTML = "Views: " + data2.items[i].statistics.viewCount + " || Likes: " + data2.items[i].statistics.likeCount + " || dislikes: " + data2.items[i].statistics.dislikeCount;

      element.appendChild(videoDetails);
      element.appendChild(iframe);
      element.appendChild(stats);

    }

    if (data2.items[i].statistics.favoriteCount > 0) {
      // console.log(data2.items[i].statistics);
    }
  }

  console.log('Number of sorted videos: ' + sortedCounter);
  console.log('Sorted Array: ' + sortedArray)

}
