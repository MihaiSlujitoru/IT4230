var key = '';

//Search Function
$("#search").click(function(event) {
	event.preventDefault();
	var param = "&query="+$("#searchInput").val();
	var URL = "https://api.themoviedb.org/3/search/movie?api_key=" + key + param;
	loadSearch(URL);
	$('.container-pagination').show();
});


//Pagination
$(function(){
	$("#page1").on('click', function() {
	    var param1 = "&query="+$("#searchInput").val()+"&page=1";
		var URL1 = "https://api.themoviedb.org/3/search/movie?api_key=" + key + param1;
	    loadSearch(URL1);
	});	
	$("#page2").on('click', function() {
	    var param2 = "&query="+$("#searchInput").val()+"&page=2";
		var URL2 = "https://api.themoviedb.org/3/search/movie?api_key=" + key + param2;
	    loadSearch(URL2);
	});		
	$("#page3").on('click', function() {
	    var param3 = "&query="+$("#searchInput").val()+"&page=3";
		var URL3 = "https://api.themoviedb.org/3/search/movie?api_key=" + key + param3;
	    loadSearch(URL3);
	});			
});

//Popular Movie Function
$("#popular").click(function(event) {
	event.preventDefault();
	var URL = "https://api.themoviedb.org/3/movie/popular?api_key=" + key + "&language=en-US";
	loadSearch(URL);
});

//Popular Movie Function
$("#upcoming").click(function(event) {
	event.preventDefault();
	var URL = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + key + "&language=en-US";
	loadSearch(URL);
});

//Popular Movie Function
$("#topRated").click(function(event) {
	event.preventDefault();
	var URL = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + key + "&language=en-US";
	loadSearch(URL);
});

//Load Search 
function loadSearch(searchURL) {
	console.log(searchURL + "   search URL");
	$.ajax({
		url: searchURL,
		type: "GET",
		dataType : "json",
		async : false,
		success: function (dataSearch) {
			$("#search-movies").html("Searching For Movies...");
			var myMovieSearch = $('#myMovieSearch').html();
			var resultsSearch = Mustache.render(myMovieSearch, dataSearch);
			$('#search-movies').html(resultsSearch);
		}
	});

	$(".movie").bind('click', function() {
		loadMovieDetails($(this).attr("id"));
	});

	$("ul.row-display li.list").bind('click', function() {
		$('.wrap-movie').removeClass('col-xs-6 col-md-3').addClass('col-xs-12');
	});

	$("ul.row-display li.grid").bind('click', function() {
		$('.wrap-movie').removeClass('col-xs-12').addClass(' col-xs-6 col-md-3');
	});	

	$(".movie").bind('click', function() {
	    $('html, body').animate({
	        scrollTop: $("#movie-details").offset().top
	    }, 1000);
	});	
}

//Load Movie Details
function loadMovieDetails(selectedMovie) {
	$("#movie-details").html("Loading...");
	var detailMovie= "https://api.themoviedb.org/3/movie/"+ selectedMovie +"?api_key="+ key+ "&append_to_response=credits";
	$.ajax({
		url: detailMovie,
		type: "GET",
		dataType : "json",
		async : false,
		success: function (dataDetails) {
			$("#movie-details").empty();
			var myMovieDetail = $('#myMovieDetail').html();
			var resultsDetails = Mustache.render(myMovieDetail, dataDetails);
			$('#movie-details').append(resultsDetails);
		}
	});

	$(".actorlink").bind('click', function() {
		loadPersonDetails($(this).attr("id"));
	});		
};
	

//Load Person Details
function loadPersonDetails(selectedPerson) {
	var detailPerson= "https://api.themoviedb.org/3/person/"+ selectedPerson +"?api_key="+ key+ "&language=en-US";
	$.ajax({
		url: detailPerson,
		type: "GET",
		dataType : "json",
		async : false,
		success: function (dataDetails) {
			$("#modal-content").empty();
			var personDetail = $('#personDetail').html();
			var resultsDetails = Mustache.render(personDetail, dataDetails);
			$('#modal-content').append(resultsDetails);
		}
	});
};


