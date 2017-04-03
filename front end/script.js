//shows form for advanced search: has extra options to search for video, under text input for video title
//options: likes, dislikes, views, comments
function showAdvancedSearch()
{
	var formHTML = "<form class='form-horizontal'>"+
				"<div class='form-group'>"+
				"<input type='text' class='form-control' id='minLikes' placeholder='Minimum number of likes'>"+
				"<input type='text' class='form-control' id='maxLikes' placeholder='Maximum number of likes'>"+
				"<input type='text' class='form-control' id='minDislikes' placeholder='Minimum number of dislikes'>"+
				"<input type='text' class='form-control' id='maxDislikes' placeholder='Maximum number of dislikes'>"+
				"<input type='text' class='form-control' id='minViews' placeholder='Minimum number of views'>"+
				"<input type='text' class='form-control' id='maxViews' placeholder='Maximum number of views'>"+
				"<input type='text' class='form-control' id='commentTerms' placeholder='terms in comments, each seperated by a comma and space'>"+
				"</div>"+
				"</form>";
	document.getElementById("advancedSearchForm").innerHTML = formHTML;
}