// Function to display weather information on the page
function displayWeather(weatherData) {
    const mainElement = document.querySelector('.weather-container');
    mainElement.innerHTML = '';
    //const loadingIndicator = document.querySelector('.loading-indicator');
    //loadingIndicator.style.display = 'none';

    // Create HTML elements to display weather information
    const locationElement = document.createElement('p');
    locationElement.textContent = `Location: ${weatherData.location}`;
    locationElement.classList.add('location-info');

    mainElement.appendChild(locationElement);

    // Iterate over periods and create HTML elements for each period
    weatherData.periods.forEach(period => {
        const periodElement = document.createElement('div');
        periodElement.classList.add('period');

        const periodNameElement = document.createElement('p');
        periodNameElement.textContent = `${period.name}`;

        const startTimeElement = document.createElement('p');
        startTimeElement.textContent = `Start Time: ${new Date(period.startTime).toLocaleString()}`;

        const endTimeElement = document.createElement('p');
        endTimeElement.textContent = `End Time: ${new Date(period.endTime).toLocaleString()}`;

        const temperatureElement = document.createElement('p');
        temperatureElement.textContent = `Temperature: ${period.temperature} °${period.temperatureUnit}`;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = `Description: ${period.shortForecast}`;

        // Create an image element for the icon
        const iconElement = document.createElement('img');
        iconElement.src = period.icon;
        iconElement.alt = `Weather Icon for ${period.shortForecast}`;
        iconElement.classList.add('weather-icon');

        // Append period information to the period element
        periodElement.appendChild(periodNameElement);
        periodElement.appendChild(startTimeElement);
        periodElement.appendChild(endTimeElement);
        periodElement.appendChild(temperatureElement);
        periodElement.appendChild(descriptionElement);
        periodElement.appendChild(iconElement);

        // Append the period element to the main element
        mainElement.appendChild(periodElement);
    });
}

// Function to fetch weather data from the server
function fetchWeather() {
    //const loadingIndicator = document.querySelector('.loading-indicator');
    
    // Display the loading indicator
    //loadingIndicator.style.display = 'block';

    fetch('http://localhost:3000/api/weather/forecast')
        .then(response => response.json())
        .then(weatherData => displayWeather(weatherData))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // loadingIndicator.innerHTML.replace = 'Error fetching weather data: ' + error;
            //loadingIndicator.style.display = 'none';
        });
}

function searchWeather() {
    const searchInput = document.getElementById('searchInput').value;

    if (searchInput.trim() !== '') {
        // Perform the weather search with the input value
        // You can modify this to call the appropriate API endpoint with the user's input
        console.log(`Searching for weather in ${searchInput}...`);

        // Clear the existing weather information
        const mainElement = document.querySelector('.weather-container');
        mainElement.innerHTML = '';

        fetch(`http://localhost:3000/api/geocode/location?location=${searchInput}`)
            .then(response => response.json())
            .then(options => displaySearchOptions(options))
            .catch(error => {
                console.error('Error fetching geocode data:', error);
            });
    } else {
        alert('Please enter a valid location.');
    }
}

function displaySearchOptions(options) {
    console.log(options); // Log the options to the console to inspect the structure

    const searchOptionsContainer = document.createElement('div');
    searchOptionsContainer.classList.add('search-options');

    // Check if options.results is an array before trying to iterate
    if (Array.isArray(options.results)) {
        const optionsList = document.createElement('ul');

        options.results.forEach(result => {
            const optionItem = document.createElement('li');
            optionItem.textContent = `${result.formatted}`;
            optionItem.addEventListener('click', () => {
                console.log(`Selected option: ${result.formatted}`);
                const url = `http://localhost:3000/api/weather/coordForecast?lat=${result.geometry.lat}&lng=${result.geometry.lng}`;
                console.log(url);
                fetch(url)
                    .then(response => response.json())
                    .then(weatherData => displayWeather(weatherData))
                    .catch(error => {
                        console.error('Error fetching or displaying data:', error);
                    });
            });
            optionsList.appendChild(optionItem);
        });

        searchOptionsContainer.appendChild(optionsList);
    } else {
        // Handle the case when options.results is not an array (e.g., display an error message)
        searchOptionsContainer.textContent = 'No valid options found';
    }

    // Append the search options to the main element
    const mainElement = document.querySelector('.weather-container');
    mainElement.appendChild(searchOptionsContainer);
}




fetchWeather();
