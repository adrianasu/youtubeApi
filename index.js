
const youtube_search_url = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
		const settings = {
			url: youtube_search_url,
			data: {q: searchTerm,
						key: "AIzaSyCeqMDyG-nlak99Pbi88_TATn2xc5WQZEE",
						part: 'snippet',
						type: 'video',
						},
			success: callback
		};
		$.ajax(settings);
}

function displayYoutubeResults(data) {
	const results = data.items.map(item =>
			generateStringsWithResults(item));
	$('.js-search-results').html(results).show();
}

function generateStringsWithResults(item) {
	return `<a class="result-box" href="https://www.youtube.com/watch?v=${item.id.videoId}">
					<img class="thumbnail" src="${item.snippet.thumbnails.medium.url}" 
					alt=""><p>${item.snippet.title}</p></a>`;
}

function watchSubmitButton() {
//  watch for when the form is submitted
		$('.js-form').on('submit', event => {
			event.preventDefault();
		// get the input text value submitted
			let query = $(this).find('.js-query');
			let querySearch = query.val();
			query.val("");
		// callback function to display results from youtube api 
			getDataFromApi(querySearch, displayYoutubeResults);
		});
}

$(watchSubmitButton);