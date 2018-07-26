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
	const results = data.items.map(item =>
		generateStringsWithResults(item));
	$('.js-search-results').html(results);
	$('.js-prev-button, .js-next-button, .js-search-results').removeClass("hide-it");
	$('.js-prev-button').attr("data", data.prevPageToken);
	$('.js-next-button').attr("data", data.nextPageToken);
}

function watchButtons() {
	$('.js-next-button').on('click', event => {
		let page = $('.js-next-button').attr("data");
		getDataFromApi(querySearch, page, displayYoutubeResults);
		console.log("next ");
	});

	$('.js-prev-button').on('click', event => {
		let page = $('.js-prev-button').attr("data");
		getDataFromApi(querySearch, page, displayYoutubeResults);
		console.log("prev ");
	});
}

function generateStringsWithResults(item) {
	return `<a class="result-box" href="https://www.youtube.com/watch?v=${item.id.videoId}">
					<img class="thumbnail" src="${item.snippet.thumbnails.medium.url}" 
					alt=""><p>${item.snippet.title}</p></a>`;
}

function watchSubmitButton() {
	//  watch for when the form is submitted
	$('.js-form').on('submit', handleSearch);
}

function handleSearch(event) {
	event.preventDefault();
	// get the input text value submitted
	let query = $(this).find('.js-query');
	querySearch = query.val();
	query.val("");
	let page = "";
	// callback function to display results from youtube api 
	getDataFromApi(querySearch, page, displayYoutubeResults);
}

function main() {
	watchSubmitButton();
	watchButtons();
}

$(main);