let cityName = "";
const input = document.getElementById('inputcity');
const apiKey = '6e1ebd41a7747a1ba9d9848aebf4b135';

const form = document.getElementById('weather-form');
form.addEventListener('submit', getCity);

navigator.geolocation.getCurrentPosition(getWeatherReportForCurrentL);

function getWeatherReportForCurrentL(position) {
    console.log(position);
    let link = 'https://api.openweathermap.org/data/2.5/weather';

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url = 
      link +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=metric";

    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function(){
        var obj = JSON.parse(this.response);
        console.log(obj);
        if(request.readyState === 4 && request.status === 200){
            document.getElementById('temperature').innerHTML = Math.round(obj.main.temp) + "°C";
            document.getElementById('feels_like').innerHTML = "Feels like " + Math.round(obj.main.feels_like) + "°C";
            document.getElementById('weather-description').innerHTML = obj.weather[0].description;
            document.getElementById('location').innerHTML = obj.name;
            const today = new Date;
            let hour = today.getHours();
            const minute = today.getMinutes();
            var append = (hour >= 12) ? "PM" : "AM";
            hour = (hour > 12) ? hour - 12 : hour;


            document.getElementById('time').innerHTML = `Last Updated: ${hour}:${minute} ${append}`;
        }else{
            document.querySelector('form .msg').innerText = "Information not available";
        }
        
}
    request.send();
}

function getCity(event) {
    // console.log("Can display");
    cityName = input.value;
    event.preventDefault();
    getWeatherReportForCity();
}


function getWeatherReportForCity() {
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    var request = new XMLHttpRequest();
    request.open('GET', link);
    request.onload = function(){
        var obj = JSON.parse(this.response);
        console.log(obj);
        if(request.readyState === 4 && request.status === 200){
            document.getElementById('temperature').innerHTML = Math.round(obj.main.temp) + "°C";
            document.getElementById('feels_like').innerHTML = "Feels like " + Math.round(obj.main.feels_like) + "°C";
            document.getElementById('weather-description').innerHTML = obj.weather[0].description;
            document.getElementById('location').innerHTML = obj.name;
            const today = new Date;
            let hour = today.getHours();
            const minute = today.getMinutes();
            var append = (hour >= 12) ? "PM" : "AM";
            hour = (hour > 12) ? hour - 12 : hour;


            document.getElementById('time').innerHTML = `Last Updated: ${hour}:${minute}:${append}`;
        }else{
            document.querySelector('form .msg').innerText = "Information not available";
        }
        
}
    request.send();
}   


