const apiKey = 'd7330e85c477585e58055d5382f4bd6f';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
var arr= JSON.parse(localStorage.getItem("recent_city")) || [];
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationBtn = document.getElementById('location');
const locationElement = document.getElementById('city');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const dateElement = document.getElementById('date');
const dayElement = document.getElementById('day');
const minElement=document.getElementById('min');
const maxElement=document.getElementById('max');
const humidityElement=document.getElementById('humidity');
const windElement=document.getElementById('wind');
const mainiconElement=document.getElementById('mainicon');
const mainiconElement1=document.getElementById('mainicon1');
const mainiconElement2=document.getElementById('mainicon2');
const mainiconElement3=document.getElementById('mainicon3');
const mainiconElement4=document.getElementById('mainicon4');
const mainiconElement5=document.getElementById('mainicon5');
//calling the function on button click 
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
        fetchWeatherforecast(location);
        
    }
    
});
//FUNCTION to fetch the data FROM API and show in HTML
function fetchWeather(location,lat,long) {
    if(location){
        const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                
                locationElement.innerHTML="";
                locationElement.textContent = data.name;
                temperatureElement.textContent = `${Math.round(data.main.temp)}`;
                const today= new Date();
                let arrayDay=["Sunday","Monday","Tuesday","Wednesday","Thrusday", "friday" ,'Saturday']
                const day= arrayDay[today.getDay()] ;
                const date= `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
                dateElement.textContent = date;
                descriptionElement.textContent = data.weather[0].description;
                console.log(today.getDay());
                
                dayElement.textContent= day;
                minElement.textContent = data.main.temp_min;
                maxElement.textContent = data.main.temp_max;
                humidityElement.textContent = data.main.humidity;
                console.log(mainiconElement);
                windElement.textContent = data.wind.speed;
                mainiconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                if(!arr.includes(location)){
                arr.push(location);
            }
                console.log(arr);
                const myJSON = JSON.stringify(arr);
                localStorage.setItem("recentcity", location);
                localStorage.setItem("recent_city", myJSON);
            })
            .catch(error => {
                alert('Error fetching weather data:', error);
            });
    }
    else{
        fetch(`${apiUrl}?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
            .then(data => { 
                console.log(data)
                locationElement.textContent = data.name;
                temperatureElement.textContent = Math.round(data.main.temp);
                const today= new Date();
                let arrayDay=["Sunday","Monday","Tuesday","Wednesday","Thrusday", "Friday" ,'Saturday']
                const day= arrayDay[today.getDay()] ;
                const date= `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
                dateElement.textContent = date;
                descriptionElement.textContent = data.weather[0].description;
                dayElement.textContent = day;
                minElement.textContent = data.main.temp_min;
                maxElement.textContent = data.main.temp_max;
                humidityElement.textContent = data.main.humidity;
                windElement.textContent = data.wind.speed;
                mainiconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    
            })
            .catch(error => {
               alert('Error fetching weather data:', error);
            });
        
    }
    
}
//function to get latitude and longitude from browser
function onPositionUpdate(position)
            {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                fetchWeather(null,lat, lng) 
                
            }
function getLocation(){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(onPositionUpdate);
               
            }
            else
                console.log("navigator.geolocation is not available");
            }
            locationBtn.addEventListener('click', 
                getLocation

           )
    // To fetch extended 5 day forecast data
function fetchWeatherforecast(location){
    if(location){
        const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

        fetch(url2)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const temp1= document.getElementById("temp1")
                const temp_max1= document.getElementById("temp_max1")
                const temp_min1= document.getElementById("temp_min1")
                const humidity1= document.getElementById("humidity1")
                const windspeed1= document.getElementById("windspeed1")
                const day1= document.getElementById("day1")
                const date1= document.getElementById("date1")

                const today= new Date();
                let arrayDay=["Sunday","Monday","Tuesday","Wednesday","Thursday", "Friday" ,'Saturday','Sunday', "Monday","Tuesday","Wednesday","Thursday", "Friday" ,'Saturday']
                day1.innerHTML= arrayDay[today.getDay()+1] ;
                date1.innerHTML= data.list[9].dt_txt.slice(0,10);
                
               temp1.innerHTML=Math.round(data.list[9].main.temp)+'°C';
               temp_max1.innerHTML= data.list[9].main.temp_max;
               temp_min1.innerHTML= data.list[9].main.temp_min;
               windspeed1.innerHTML= data.list[9].wind.speed;
               humidity1.innerHTML= data.list[9].main.humidity;
               mainiconElement1.src=`https://openweathermap.org/img/wn/${data.list[9].weather[0].icon}@4x.png`
                const temp2= document.getElementById("temp2")
                const temp_max2= document.getElementById("temp_max2")
                const temp_min2= document.getElementById("temp_min2")
                const humidity2= document.getElementById("humidity2")
                const windspeed2= document.getElementById("windspeed2")
                const day2= document.getElementById("day2")
                const date2= document.getElementById("date2")

                
                day2.innerHTML= arrayDay[today.getDay()+2] ;
                date2.innerHTML= data.list[18].dt_txt.slice(0,10);
                
               temp2.innerHTML=Math.round(data.list[18].main.temp)+'°C';
               temp_max2.innerHTML= data.list[18].main.temp_max;
               temp_min2.innerHTML= data.list[18].main.temp_min;
               windspeed2.innerHTML= data.list[18].wind.speed;
               humidity2.innerHTML= data.list[18].main.humidity;
               mainiconElement2.src=`https://openweathermap.org/img/wn/${data.list[18].weather[0].icon}@4x.png`;
                const temp3= document.getElementById("temp3")
                const temp_max3= document.getElementById("temp_max3")
                const temp_min3= document.getElementById("temp_min3")
                const humidity3= document.getElementById("humidity3")
                const windspeed3= document.getElementById("windspeed3")
                const day3= document.getElementById("day3")
                const date3= document.getElementById("date3")

                
                day3.innerHTML= arrayDay[today.getDay()+3] ;
                date3.innerHTML= data.list[26].dt_txt.slice(0,10);
                
               temp3.innerHTML=Math.round(data.list[26].main.temp)+'°C';
               temp_max3.innerHTML= data.list[26].main.temp_max;
               temp_min3.innerHTML= data.list[26].main.temp_min;
               windspeed3.innerHTML= data.list[26].wind.speed;
               humidity3.innerHTML= data.list[26].main.humidity;
               mainiconElement3.src=`https://openweathermap.org/img/wn/${data.list[26].weather[0].icon}@4x.png`
                const temp4= document.getElementById("temp4")
                const temp_max4= document.getElementById("temp_max4")
                const temp_min4= document.getElementById("temp_min4")
                const humidity4= document.getElementById("humidity4")
                const windspeed4= document.getElementById("windspeed4")
                const day4= document.getElementById("day4")
                const date4= document.getElementById("date4")

                
                day4.innerHTML= arrayDay[today.getDay()+4] ;
                date4.innerHTML= data.list[29].dt_txt.slice(0,10);
                
               temp4.innerHTML=Math.round(data.list[29].main.temp)+'°C';
               temp_max4.innerHTML= data.list[29].main.temp_max;
               temp_min4.innerHTML= data.list[29].main.temp_min;
               windspeed4.innerHTML= data.list[29].wind.speed;
               humidity4.innerHTML= data.list[29].main.humidity;
               mainiconElement4.src=`https://openweathermap.org/img/wn/${data.list[29].weather[0].icon}@4x.png`
                const temp5= document.getElementById("temp5")
                const temp_max5= document.getElementById("temp_max5")
                const temp_min5= document.getElementById("temp_min5")
                const humidity5= document.getElementById("humidity5")
                const windspeed5= document.getElementById("windspeed5")
                const day5= document.getElementById("day5")
                const date5= document.getElementById("date5")

                
                day5.innerHTML= arrayDay[today.getDay()+5] ;
                date5.innerHTML= data.list[37].dt_txt.slice(0,10);
                
               temp5.innerHTML=Math.round(data.list[37].main.temp)+'°C';
               temp_max5.innerHTML= data.list[37].main.temp_max;
               temp_min5.innerHTML= data.list[37].main.temp_min;
               windspeed5.innerHTML= data.list[37].wind.speed;
               humidity5.innerHTML= data.list[37].main.humidity;
               mainiconElement5.src=`https://openweathermap.org/img/wn/${data.list[37].weather[0].icon}@4x.png`
               console.log(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }
    
}
// showing data of recent city 
window.onload= ()=>{
   var q = localStorage.getItem("recentcity");
   if(q){fetchWeather(q); fetchWeatherforecast(q);}
}
//dropdown for recent city search
function dropdown(){
    const drop =document.createElement('div');
    drop.classList.remove("hidden");
    arr.forEach((data,index) => {
     const down =document.createElement('p');
     down.textContent=data;
     down.classList.add("mx-4")
     down.classList.add("cursor-pointer")
     drop.appendChild(down);
     down.addEventListener("click",()=>{
        locationInput.value=arr[index];
        drop.classList.add("hidden");
     })

    })

        dropdown1.appendChild(drop);
    
}
const dropdown1=document.getElementById("dropdown");
locationInput.addEventListener( "click", ()=>{
    dropdown1.innerHTML="";
    dropdown();

} )
// disappear the dropdown on focusout
locationInput.addEventListener( "focusout", ()=>{
    setTimeout(()=>dropdown1.innerHTML="",500)

} )