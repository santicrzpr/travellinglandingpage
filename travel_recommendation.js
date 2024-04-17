const btnSearch = document.getElementById('btnSearch');

function searchLocations() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementByClass('searchResults');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation.json')
      .then(response => response.json())
      .then(data => {
        /* const locations = data.find(item => item.name.toLowerCase() === input); */
        let keys = Object.keys(data);
        let types = keys.filter(e => e.includes(input.toLowerCase()))
        
        types.forEach(type => {
            var locations = data[type];
            console.log(data[type])
            if(type == 'countries') {
                locations = [];
                //resultDiv.innerHTML += '<h2>Countries</h1>';
                data[type].forEach(e => {
                    e.cities.forEach(loc => {
                        locations.push(loc)
                    })
                    
                })
            }
            locations.forEach(loc => {
                console.log(loc)
                let newLocation = `<div class="destination__card">`;
                newLocation += `<div class="location-image"><img src="assets/${loc.imageUrl}" alt="apicture"/></div>`;
                newLocation += `<div class="card__content">`;
                newLocation += `<h4 class="location-title">${loc.name}</h4>`;
                newLocation += `<p class="location-description">${loc.description}</p>`;
                newLocation += `<button class="btn">Select destination</button>`;

                newLocation += `</div>`;
                newLocation += `</div>`;
                resultDiv.innerHTML += newLocation;
            })
            
        })

      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
}

function clearResults() {
    const input = document.getElementById('searchInput').value = "";
    const resultDiv = document.getElementById('searchResults');
    resultDiv.innerHTML = '';
}

btnSearch.addEventListener('click', searchLocations);
