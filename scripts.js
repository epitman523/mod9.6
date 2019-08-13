'use strict'

const searchURL = 'https://api.github.com/users/';

function displayResults(responseJSON) {
    $('.js-repo-list').empty();
    if (responseJSON.length < 1) {
        $('.js-repo-list').append('<li>We cannot find that user handle, please try again.</li>');
    }
    for (let i = 0; i < responseJSON.length; i++) {
        $('.js-repo-list').append(`
            <li><a href="${responseJSON[i].svn_url}">${responseJSON[i].name}</a></li>
        `);
    }
}
function getGitHubList(query) {
    let newURL = searchURL + query + '/repos'
    //3. Fetch repo list via GitHub API
    fetch(newURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => displayResults(responseJSON))
        .catch(err => {
            $('.js-error-message').text(`Something went wrong: ${err.message}`)
        });
}
function watchForm() {
    $('#repo-search').submit(event => {
        event.preventDefault();
        const searchTerm = $('#github-handle').val();
        getGitHubList(searchTerm);
    });

}
$(watchForm);