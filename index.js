const youtube_search_url = "https://www.googleapis.com/youtube/v3/search";
let querySearch = "";


function getDataFromApi(searchTerm, page, callback) {
	const settings = {
		url: youtube_search_url,
		data: {
			q: searchTerm,
			key: "AIzaSyCeqMDyG-nlak99Pbi88_TATn2xc5WQZEE",
			part: 'snippet',
			type: 'video',
			maxResults: 6,
			pageToken: page,
		},
		success: callback
	};
	$.ajax(settings);
}

function displayYoutubeResults(data) {
	const results = data.items.map(generateStringsWithResults);
	$('.js-start').hide();
	$('.js-results-number').text(`Showing ${results.length} results of ${data.pageInfo.totalResults}`);
	$('.js-results').html(results);
	$('.js-prev-button').attr("data", data.prevPageToken);
	$('.js-next-button').attr("data", data.nextPageToken);
	$('.js-prev-button, .js-next-button, .js-reset-button, .js-results').show();
}

function watchButtons() {
	$('.js-next-button').on('click', event => {
		let page = $('.js-next-button').attr("data");
		getDataFromApi(querySearch, page, displayYoutubeResults);
	});

	$('.js-prev-button').on('click', event => {
		let page = $('.js-prev-button').attr("data");
		getDataFromApi(querySearch, page, displayYoutubeResults);
	});

	$('.js-reset-button').on('click', event => {
		$('.js-prev-button').attr("");
		querySearch = "";
		$('.js-results-number').text("");
		$('.js-prev-button, .js-next-button, .js-reset-button, .js-results').hide();
		$('.js-start').show();
	});
}

function generateStringsWithResults(item) {
	return `<a class="result-box" href="https://www.youtube.com/watch?v=${item.id.videoId}">
					<img class="thumbnail" src="${item.snippet.thumbnails.medium.url}" 
					alt=""><p>${item.snippet.title}</p></a>`;
}

function watchSubmitButton() {
	$('.js-form').on('submit', handleSearch);
}

function handleSearch(event) {
	event.preventDefault();
	let query = $(this).find('.js-query');
	querySearch = query.val();
	query.val("");
	let page = "";
	getDataFromApi(querySearch, page, displayYoutubeResults);
}

function main() {
	$('.js-prev-button, .js-next-button, .js-reset-button, .js-results').hide();
	watchSubmitButton();
	watchButtons();
}

$(main);