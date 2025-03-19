let  form_overlay = document.getElementById('data-submit')
let light_mode = true

function set_background(hours){
    console.log('inside');
    document.body.style.backgroundImage = hours >= 12 ?
    // `url('https://plus.unsplash.com/premium_photo-1672070779337-e5655d9bbd9e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
    `url('https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJpZ2h0JTIwc2t5fGVufDB8fDB8fHww')`
    :
    `url('https://images.unsplash.com/photo-1504858700536-882c978a3464?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
    // `url('http://plus.unsplash.com/premium_photo-1727730047398-49766e915c1d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xlYXIlMjBza3l8ZW58MHx8MHx8fDA%3D')`;
}

function changeMode(){
    light_mode = !light_mode;
    if(light_mode){
        document.body.classList.remove('darkmode')
        document.body.classList.add('lightmode')
        stars.classList.add('sun')
        toggle.classList.add('day')
        toggle.ariaPressed = "false"
    }
    else{
        document.body.classList.remove('lightmode')
        document.body.classList.add('darkmode')
        stars.classList.remove('sun')
        toggle.classList.remove('day')
        toggle.ariaPressed = "true"
    }
}

async function fetch_weather_data(){

    // e.preventDefault();
    // debugger;
    // let city =
    const API_KEY = `66a0529e6769292c87beebd057aa4e52`
    let city = cityname.value.trim() // target value
    if(!city)
        return

    const URL = `https://api.openweathermap.org/data/2.5/weather`
    let data = await fetch(`${URL}?q=${city}&appid=${API_KEY}`, )
                .then(response => response.json())

    console.log(data);

    try{
        if( data.cod == 200 ){
            content.innerHTML = `
                 <div class="ps-5 md:col-span-2">
                <p class="location text-lg">
                    <i class="fa-solid fa-location-dot "></i>
                    <span id="place"></span>
                </p>
                <p class="location text-lg">
                    <span id="temperature"></span>
                </p>

            </div>
            <div class="ps-5 md:col-span-2">
                <p class="location text-lg">
                    Humidity
                    <span id="humidity"></span>
                </p>

                <p class="">
                    Wind Speed
                    <span id="wind"></span>
                </p>

                <p class="">
                    Pressure
                    <span id="pressure"></span>
                </p>


                <p class="">
                    <span id="date"></span>
                </p>


            </div>
            `

            let date = new Date((data.dt + data.timezone) * 1000)
            let day = date.getUTCDate();
            let month = date.getUTCMonth() + 1;
            let year = date.getUTCFullYear();
            let hours = date.getUTCHours();
            let minutes = date.getUTCMinutes();
            let meridiem = hours >= 12 ? 'PM' : 'AM';
            set_background(hours)
            hours = (hours % 12) || 12;
            month = month.toString().padStart(2,'0')
            day = day.toString().padStart(2,'0')
            minutes = minutes.toString().padStart(2,'0')
            document.getElementById('date').innerText =  `${day}-${month}-${year} ${hours}:${minutes} ${meridiem}`;

            humidity.innerText = `${data.main.humidity} %` ;
            wind.innerText = `${data.wind.speed} m/s`;
            pressure.innerText = `${data.main.pressure} hPa`;
            place.innerText = `${data.name}, ${data.sys.country}`;
            temperature.innerText = `${data.main.temp}°C`;

            /*



             weather
             celcius            weather.main.temp
             feels like         weather.main.feels_like
             location           weather.name
             Time  (seconds offset)    weather.timezone
             place
             search button
             country            weather.country
             humidity           weather.main.humidity
             wind speed
             pressure           weather.main.pressure
            weather.coord : object weather.coord   .lat/lon
            weather.name
            */


        }
    }
    catch( error){
        console.error(`Requested city doesn't exist ... enter a valid name`)
    }

    city.value = '';
}


form_overlay.addEventListener("submit", (e) => {e.preventDefault(); fetch_weather_data()})
window.addEventListener("DOMContentLoaded", set_background())
toggle.addEventListener('click' , changeMode )

