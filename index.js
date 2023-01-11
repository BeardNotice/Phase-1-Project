
/*/////////
/Variables/
/////////*/

//references to the search form and results divs
const searchForm = document.getElementById('search-form');
const resultsDiv = document.getElementById('results');

//this variable sets the default zip code
const defaultZipCode = '10001';

/*///////////
//Functions//
///////////*/

//function to search for breweries by zip code
const search = (zipCode) => {
  // makes a get request to the openbrewerydb api to search for breweries by zip code
  fetch(`https://api.openbrewerydb.org/breweries?by_postal=${zipCode}`)

    .then((response) => {
      return response.json();
    })
    .then((breweries) => {
      
      //console logged to check and make sure breweries were returned correctly
      //console.log(breweries);

      // clears the previous search results
      resultsDiv.innerHTML = '';


      if (breweries.length === 0) {
        // if there are no results, display the following message
        resultsDiv.innerHTML = '<h2>No Breweries listed in this area, try another zip code</h2>';
      } else {
      // displays the search results as a card, per card
      breweries.forEach((brewery) => {
        resultsDiv.innerHTML += `
          <div class="card">
            <div class="card-header">
              <h2>${brewery.name}</h2>
            </div>
            <div class="card-body">
              <p>${brewery.street || 'Not Listed'}</p>
              <p>${brewery.city}, ${brewery.state} ${brewery.postal_code}</p>
              <br>
              <p>Phone: ${brewery.phone || 'No phone number available'}</p>
              <p>${brewery.website_url ? `<a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a>`:
               'No Website Available'}</p>
            </div>
          </div>
        `;
      });
      //adds 'End of Search Results' to the end of the search results
      resultsDiv.innerHTML += '<h2>End of Search Results</h2>';
    }
    });
  };


/*///////////////
/Event Listeners/
///////////////*/

// submit event listener
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // gets the zip code that the user entered, or uses the default if no zip code was entered
  const zipCode = document.getElementById('zip-code').value || defaultZipCode;

  // runs the search function
  search(zipCode);
});



// reset button event listener
document.getElementById('reset-button').addEventListener('click', () => {

  //clears the page, and adds a message to get started

  resultsDiv.innerHTML = `
    <h2>Type a zip code above to get started</h2>
     `;
  document.getElementById('zip-code').value = '';
});



  //adds functionality to search by pressing enter
searchForm.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    
    // gets the zip code that user entered, or uses the default if no zip code was entered
    const zipCode = document.getElementById('zip-code').value || defaultZipCode;
        
    // searches for breweries by the zip code
    search(zipCode);
  }
});

  //adds a window resize event listener
window.addEventListener('resize', () => {
  //created variables for width and cards
  var width = window.innerWidth;
  var cards = [...document.querySelectorAll('.card')];

  //using map function to change characteristics of the cards
  cards.map(card => {
    if (width < 300) {
      card.querySelector('h2').style.fontSize = '1em';
      card.querySelectorAll('p').forEach(p => {p.style.fontSize = '0.8em'});
    } else if (width>=400){
      card.querySelector('h2').style.fontSize = '1.6em';
      card.querySelectorAll('p').forEach(p => {p.style.fontSize = '1.4em'});
    } else {
      card.querySelector('h2').style.fontSize = '2em';
      card.querySelectorAll('p').forEach(p => {p.style.fontSize = '1.8em'});
    }
  })

});

/*///////////////
//Default event//
///////////////*/

search(defaultZipCode);