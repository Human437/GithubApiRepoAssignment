'use strict';

const searchURL = 'https://api.github.com/users/';

function displayResults(responseJson){
  console.log(responseJson);
  let html = "";
  $('#results-list').empty();
  for (let i = 0;i <responseJson.length;i++){
    html += `<h3>${responseJson[i].name}</h3><a href = "${responseJson[i].html_url}">Link to the Repo</a>`
  }
  $('#results-list').append(html);
  $('#results').removeClass('hidden');
}

function getRepos(query) {
  const url = `${searchURL}${query}/repos`;

  console.log(url);

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}

$(watchForm);