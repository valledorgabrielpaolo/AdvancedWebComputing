var inputEl = document.getElementById('search-textbox');
        var btnAddEl = document.getElementById('search-button');
        inputEl.onkeydown = function(ev){
            if(ev.keyCode === 13){
                onClickBtnAdd();
            }
        }

        var onClickBtnAdd = function() {
            if (inputEl.value.length === 0) {
                alert('Empty Input! Please enter any value!')
            }


            else{

					    $(function(){

						$('body').append('<h1>Movies</h1>');
						var server = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json'
						$.ajax({
							url:server,
							dataType: 'jsonp',
							data:{
								q: inputEl.value,
								apiKey: 'hcrurhsttexasrgfm2y6yahm'
							},
							success:showMovies
						});

						function showMovies(response){
							console.log('response', response);
							var movies = response.movies;
							for(var i = 0; i < movies.length; i++)
							{
								var movie = movies[i];
								$('body').append('<h3>' + movie.title+ ' </h3>');
								$('body').append('<img src ="' +movie.posters.thumbnail + '"/>');
							}
						}
						});     
        			}
        	};
