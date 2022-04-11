let weather = {
  APIkey: "b45fc1e4a5d228ab318f35ea243366c9",
  
  fetchWeather: function (city) {

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?zip=" + city + "&units=imperial&appid=" + this.APIkey
    )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity, temp_min, temp_max, feels_like } = data.main;
      const { speed } = data.wind;
      let time= Date.now()
      document.querySelector(".city").innerText = name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".date").innerText = new Date(time).toUTCString().slice(0, 12),
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp_max").innerText = "Max: " + Math.round(temp_max) + "°F";
      document.querySelector(".temp_min").innerText = "Min: " + Math.round(temp_min) + "°F"; 
      document.querySelector(".feels_like").innerText = "Feels Like " + Math.round(feels_like) + "°F";
      document.querySelector(".temp").innerText = Math.round(temp) + "°F";
      document.querySelector(".humidity").innerText =
        "Humidity " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind " + Math.round(speed) + "m/h  ";
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + "galaxy" + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".searchBar").value);
    },
  };
  
  document.querySelector("button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".searchBar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("10310");