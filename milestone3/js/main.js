//My Google Books
$(function() {
	var myBooks = "https://www.googleapis.com/books/v1/users/103510794567502364870/bookshelves/0/volumes";
	loadMyBookShelf(myBooks);
});


//Search Function
$("#search").click(function(preventDefault) {
	event.preventDefault();
	var param = "?q="+$("#searchInput").val()+"&startIndex=0";
	var booksURL = "https://www.googleapis.com/books/v1/volumes" + param;
	loadSearch(booksURL);
});

//Pagination

$(function(){
	$("#page1").on('click', function() {
	    $("#search-books").empty();
	    var param1 = "?q="+$("#searchInput").val()+"&startIndex=0";
	    var booksUrl = "https://www.googleapis.com/books/v1/volumes?q=" + param1;
	    loadSearch(booksUrl);
	});
	$("#page2").on('click', function() {
	    $("#search-books").empty();
	    var param2 = "?q="+$("#searchInput").val()+"&startIndex=10";
	    var booksUrl = "https://www.googleapis.com/books/v1/volumes?q=" + param2;
	    loadSearch(booksUrl);
	});
	$("#page3").on('click', function() {
	    $("#search-books").empty();
	    var param3 = "?q="+$("#searchInput").val()+"&startIndex=20";
	    var booksUrl = "https://www.googleapis.com/books/v1/volumes?q=" + param3;
	    loadSearch(booksUrl);
	});		
});


//Load My Books Shelf
function loadMyBookShelf(myBooks) {
	$.getJSON(myBooks, function(json) {
		var myBooks = "";
		for (i in json.items) {
			myBooks+="<div class='col-xs-6 col-md-3'>";
			myBooks+="<img class='book image image-center' id='"+ json.items[i].id +"' ";
			myBooks+="src='"+ json.items[i].volumeInfo.imageLinks.smallThumbnail +"'>";
			myBooks+="</div>";
		}
		$("#my-books").html(myBooks);
		$(".book").on('click', function() {
			loadBooksDetails($(this).attr('id'));
		});
	});
}

//Load Search 
function loadSearch(searchURL) {
  $("#search-books").html("Searching For Books...");
  $.getJSON(searchURL, function(json) {
    var searchBooks = "";
		for (i in json.items) {
			searchBooks+="<div class='col-xs-6 col-md-3'>";
			searchBooks+="<img class='book image image-center' id='"+ json.items[i].id +"' ";
			searchBooks+="src='"+ json.items[i].volumeInfo.imageLinks.smallThumbnail +"'>";
			searchBooks+="</div>";
		}

		$("#search-books").html(searchBooks);

		$(".book").on('click', function() {
			loadBooksDetails($(this).attr("id"));
		});
  });
}

//Load Books Details
function loadBooksDetails(selectedBook) {
	$("#book-details").html("Loading...");
	$.getJSON("https://www.googleapis.com/books/v1/volumes/" + selectedBook, function (json){
		$("#book-details").empty();
		var resultHTML = "";
		resultHTML+="<div class='row'>";
		resultHTML+="<div class='col-xs-12 col-md-3 cover'><img class='book' src='"+ json.volumeInfo.imageLinks.smallThumbnail +"'></div>";
		resultHTML+="<div class='col-xs-12 col-md-9 info'>";
			resultHTML += "<h2>" + json.volumeInfo.title + "</h2>";
			resultHTML += "<p>Author: " + json.volumeInfo.authors + "</p>";
			resultHTML += "<p>Publisher: " + json.volumeInfo.publisher + "</p>";
			resultHTML += "<p>ISBN: " + json.volumeInfo.industryIdentifiers[0].identifier + "</p>";
			resultHTML += "<p>Number of Pages: " + json.volumeInfo.pageCount + "</p>";		
			if(typeof(json.saleInfo.listPrice) != "undefined") {
				resultHTML += "<p>List Price: " + json.saleInfo.listPrice.amount + "</p>";
			} else {
				resultHTML += "<p>List Price: Not Listed</p>";
			}				
	    resultHTML += "<p>Description: " + json.volumeInfo.description + "</p>";
		resultHTML+= "</div>";
		resultHTML+="</div>";
      	
      	$("#book-details").html(resultHTML);
  });
};
