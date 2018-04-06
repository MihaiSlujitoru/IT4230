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
	$.ajax({
		url: myBooks,
		type: "GET",
		dataType : "json",
		async : false,
		success: function (dataShelf) {
			var myBookShelfTemplate = $('#myBookShelfTemplate').html();
			var results = Mustache.render(myBookShelfTemplate, dataShelf);
			$('#my-books').append(results);
		}
	});

	$(".book").on('click', function() {
		loadBooksDetails($(this).attr('id'));
	});
}

//Load Search 
function loadSearch(searchURL) {
  	
	$.ajax({
		url: searchURL,
		type: "GET",
		dataType : "json",
		async : false,
		success: function (dataSearch) {
			$("#search-books").html("Searching For Books...");
			var myBookSearch = $('#myBookSearch').html();
			var resultsSearch = Mustache.render(myBookSearch, dataSearch);
			$('#search-books').html(resultsSearch);
		}
	});

	$(".book").on('click', function() {
		loadBooksDetails($(this).attr("id"));
	});
}

//Load Books Details
function loadBooksDetails(selectedBook) {
	$("#book-details").html("Loading...");
	var detailBook = "https://www.googleapis.com/books/v1/volumes/" + selectedBook;
	console.log(detailBook);
	$.ajax({
		url: detailBook,
		type: "GET",
		dataType : "json",
		async : false,
		success: function (dataDetails) {
			$("#book-details").empty();
			var myBookDetail = $('#myBookDetail').html();
			var resultsDetails = Mustache.render(myBookDetail, dataDetails);
			$('#book-details').append(resultsDetails);
		}
	});
};
