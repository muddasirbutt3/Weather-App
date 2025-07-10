const btn = document.querySelector("#btn")
const search = document.querySelector("#input")
const output = document.querySelector(".output")

function handleInput() {
    
    let city = search.value.toLowerCase()
    if (city == '') {
        return;
    }
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=932a0775642e6a74689629b7089e2d39`;
    fetch(api)
    .then((res) => res.json())
    .then(data => {
        if (data.cod == "404") {
            output.innerHTML = `<div class="error">
            <img src="./images/404.png">
            </div>
            <h3>${data.message}</h3>
            
            `
            output.style.height = 'auto'
            search.value = ''
            return;
        }
        
        
        getWeather(data)
    })
}


function getWeather(data) {
    output.style.height = 'auto'
    search.value = ''
    let html = `<div class="img">
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                </div>
                <div class="temp">${data.main.temp}°C</div>
                <div class="city">${data.name}, ${data.sys.country}</div>
                <div class="state">${data.weather[0].description}</div>
                <div class="group">
                    <div class="item item1">
                        <div class="icon"><i class="fa-solid fa-droplet"></i></div>
                        <div class="text">
                            <p class="value">${data.main.humidity}%</p>
                            <p>Humidity</p>
                        </div>
                        </div>
                        <div class="item feels">
                            <div class="icon"><i class="fa-solid fa-temperature-three-quarters"></i></div>
                            <div class="text">
                                <p class="value">${data.main.feels_like}°C</p>
                                <p>feels like</p>
                            </div>
                        </div>
                    <div class="item">
                    <div class="icon"><i class="fa-solid fa-wind"></i></div>
                    <div class="text">
                    <p class="value">${data.wind.speed}km/h</p>
                    <p>wind speed</p>
                    </div>
                    </div>
                    </div>`
    output.innerHTML = html
}

btn.addEventListener("click",handleInput)