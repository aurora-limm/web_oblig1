const coordinates = [
    'latitude=60.0713&longitude=11.0362', 
    'latitude=55.9304&longitude=12.4695', 
    'latitude=66.5&longitude=25.7167', 
    'latitude=54.6893&longitude=-7.0775', 
    'latitude=51.6028&longitude=-10.1992', 
    'latitude=61.8076&longitude=-6.6709'
];

async function get_weather_data(coordinate, index) {
    // Fetches data from the API
    const data = await fetch(`https://api.open-meteo.com/v1/forecast?${coordinate}&current=temperature_2m,rain,snowfall,wind_speed_10m,wind_direction_10m`)
    .then((response) => response.json())
    .catch(() => {
      alert(`not found`);
      return;
    });

  if (data === undefined) return;   // Returns in case of error

    // Sets the values from the API call
    const rain = data.current.rain  
    const snow = data.current.snowfall
    const temp = data.current.temperature_2m;
    const windSpeed = data.current.wind_speed_10m;
    const wind_direction = data.current.wind_direction_10m;
    const timestamp = data.current.time; 

    // Enables the correct format of time and date
    const weather_date = new Date(timestamp);
    const date = weather_date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    }); 

    const time = weather_date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false
    });

    // Updates the HTML elements
    document.getElementById(`temp-${index}`).textContent = `${temp} °C`;
    document.getElementById(`rain-${index}`).textContent = `${rain} mm`;
    document.getElementById(`snow-${index}`).textContent = `${snow} mm`;
    document.getElementById(`wind-${index}`).textContent = `${windSpeed} km/h`;
    document.getElementById(`dir-${index}`).style.transform = 'rotate('+wind_direction+'deg)';
    document.getElementById(`date-${index}`).textContent = date;
    document.getElementById(`time-${index}`).textContent = time;

}

// Iterates throug the coordinates and create an API call for each
coordinates.forEach((coordinate, index) => {
    get_weather_data(coordinate, index + 1);
});
