// Clock functionality
function updateClock(){
    const time = new Date();
    const timeString = time.toLocaleTimeString();
    const dateString = time.toLocaleDateString();
    
    document.getElementById('time').innerText = timeString; 
    document.getElementById('date').innerText = dateString;
}

setInterval(updateClock, 1000);
updateClock();

//Weather API
const apiKey = '4c9df610b0345ef35848f6b40a6e5da6';
const city = 'Mississauga';

// Function to update weather display data
function updateWeatherDisplay(weatherData) {
    const iconCode = weatherData.weather[0].icon;

    document.getElementById('weather-location').innerText = `${weatherData.name}, ${weatherData.sys.country}`;
    document.getElementById('weather-description').innerText = `${weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}`;
    document.getElementById('weather-temp').innerText = `${Math.round(weatherData.main.temp)}°C`;
    document.getElementById('weather-humidity').innerText = `Humidity: ${weatherData.main.humidity}%`;
    document.getElementById('weather-wind').innerText = `Wind Speed: ${weatherData.wind.speed} m/s`;
    
    // Update weather icon
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Update background based on weather condition
    updateBackgroundImage(iconCode);
}

// Function to map weather icons to background images
function updateBackgroundImage(iconCode) {
    let imageUrl;

    if (iconCode.startsWith('11')) { // Thunderstorm
        imageUrl = "url('https://cdn.britannica.com/57/150357-050-427E4C4F/lightning-discharge-field-cumulonimbus-cloud.jpg')";
    } else if (iconCode.startsWith('09') || iconCode.startsWith('10')) { // Rain/Drizzle
        imageUrl = "url('https://www.sciline.org/wp-content/uploads/2021/02/cropped-Torrential-Rain-Flooding-and-Climate-Change.jpg')";
    } else if (iconCode.startsWith('13')) { // Snow
        imageUrl = "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/da115ae3-028a-4747-ae73-dff7bac334e1/dedi06j-144974ff-769a-455d-b631-c2b4c626643c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RhMTE1YWUzLTAyOGEtNDc0Ny1hZTczLWRmZjdiYWMzMzRlMVwvZGVkaTA2ai0xNDQ5NzRmZi03NjlhLTQ1NWQtYjYzMS1jMmI0YzYyNjY0M2MuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.3pXVYP7gpoACgAy-C8_hPO0-MXeYXBf1QcCp50NHKG0')";
    } else if (iconCode.startsWith('50')) { // Atmosphere (Mist, fog, etc.)
        imageUrl = "url('https://www.ksla.com/resizer/LU_xFilxTouXsrgXzyyq0irEdNs=/arc-photo-gray/arc3-prod/public/JFDZ7U577FFBTCTSLUKDQDSAYQ.png')";
    } else if (iconCode === '01d' || iconCode === '01n') { // Clear sky
        imageUrl = "url('https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618_1280.jpg')";
    } else if (iconCode.startsWith('02') || iconCode.startsWith('03') || iconCode.startsWith('04')) { // Clouds
        imageUrl = "url('https://cdn.mos.cms.futurecdn.net/JDffSbqHyJKwadME6Qyoj5-1200-80.jpg')";
    } else {
        imageUrl = "url('https://example.com/default.jpg')"; // Default background
    }

    document.body.style.backgroundImage = imageUrl;
}

// Function to fetch weather data from OpenWeather API
async function fetchWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        // Check if the response is okay
        if (!response.ok) {
            throw new Error('Network response was not ok. Status: ' + response.status);
        }

        const data = await response.json();
        updateWeatherDisplay(data);
    } catch (error) {
        logApiError(error);
    }
}

// Fetch weather data when the script is executed
fetchWeather();
