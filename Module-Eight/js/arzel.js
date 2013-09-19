$(function(){		
	/*Converting release date to english terms*/
	var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	Handlebars.registerHelper("full_date", function(date){
		return month[date.split("-")[1] - 1] + " " + date.split("-")[2] +  ", " + date.split("-")[0];
	});
	
	$('.scs_button').click(function(){
		get($(this).text(), 'http://api.rottentomatoes.com/api/public/v1.0/movies.json', 1);
	});
	
	$('#search_box').keypress(function(E){
		if(E.which == 13)
			get($('#search_box').val(), 'http://api.rottentomatoes.com/api/public/v1.0/movies.json', 1);
	});
	$('#btn').click(function(){
            get($('#search_box').val(), 'http://api.rottentomatoes.com/api/public/v1.0/movies.json', 1);
    });

	$('#box_office').click(function(){
		get("", 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json', 1);
	});
	$('#top_ten').click(function(){
		get("", 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json', 1);
	});

	$('#upcoming').click(function(){
		get("", 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json', 1);
	});
	$('#latest').click(function(){
		get("", 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json', 1);
	});

	$('#opening').click(function(){
		get("", 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json', 1);
	});

	$('#in_theaters').click(function(){
		get("", 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json', 1);
	});

	$('#page_up').click(function(){
		if(result_page.length > parseInt($('#page_number').text())){
			$('#page_number').html(parseInt($('#page_number').text()) + 1);
			showMovies(parseInt($('#page_number').text()) - 1);
		}
	});

	$('#page_down').click(function(){
		if(parseInt($('#page_number').text()) > 1){
			$('#page_number').html(parseInt($('#page_number').text()) - 1);
			showMovies(parseInt($('#page_number').text()) - 1);
		}
	});
	function get(q, url, page){
		$.ajax({
			url: url,
			dataType: 'jsonp',
			data: {
				q: q,
				apiKey: 'p94x5pk5qgemuwh2k6xaha83',
				page_limit: 30,
				limit: 30,
				page: page
			},
			success: getPages

		});
	}
	
	/*Managing pages*/
	function getPages(response){
		console.log(response);
		var movies = response.movies;
		
		/*setting up the pages*/
		if(movies.length / 6 > parseInt(movies.length / 6))
			result_page = new Array(parseInt(movies.length / 6) + 1);
		else
			result_page = new Array(movies.length / 6);
		
		var page_length = movies.length;
		for(var x = 0 ; x < result_page.length ; x++){
			if(page_length >= 6){
				result_page[x] = new Array(6);
				page_length -= 6;
			}
			else
				result_page[x] = new Array(page_length);
		}
		
		/*Adding movie objs to the pages*/
		var x = 0;
		var y = 0;
		for(var z = 0 ; z < movies.length ; z++){
			if(y < result_page[x].length){
				result_page[x][y] = movies[z];
				y++;
			}
			else{
				x++;
				y = 0;
				result_page[x][y] = movies[z];
				y++;
			}
		}
		showMovies(0);
	}
	
	/*Displaying results*/
	function showMovies(page_number){
		$('#search_box').val('');
		$('#view_options').css('display', 'inline');
		
		/*setting up the 2 columns in the results_area*/
		var first_column = new Array(result_page[page_number].length - parseInt(result_page[page_number].length/2));
		var second_column = new Array(parseInt(result_page[page_number].length/2));
				
		for(var x = 0 ; x < result_page[page_number].length ; x++){
			if(x % 2 == 0)
				first_column[x / 2] = result_page[page_number][x];
			else
				second_column[(x - 1) / 2] = result_page[page_number][x];
		}

		$('#results_area').empty();
		$('#results_area').append('<ul id="first"></ul><ul id="second"></ul>');
		$('#first').append(Handlebars.compile($('#results_template').html())(first_column));
		$('#second').append(Handlebars.compile($('#results_template').html())(second_column));
		
		$('.result_box').click(function(){
					get($(this).result_box(), 'http://api.rottentomatoes.com/api/public/v1.0/movies.json', 1);
				});
	}
});