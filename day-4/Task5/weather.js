const weatherCode = {
  0: "Clear Sky",
  1: "Mainly clear, partly cloudy, and overcast",
  2: "Mainly clear, partly cloudy, and overcast",
  3: "Mainly clear, partly cloudy, and overcast",
  45: "Fog and depositing rime fog",
  48: "Fog and depositing rime fog",
  51: "Drizzle: Light, moderate, and dense intensity",
  53: "Drizzle: Light, moderate, and dense intensity",
  55: "Drizzle: Light, moderate, and dense intensity",
  56: "Freezing Drizzle: Light and dense intensity",
  57: "Freezing Drizzle: Light and dense intensity",
  61: "Rain: Slight, moderate and heavy intensity",
  63: "Rain: Slight, moderate and heavy intensity",
  65: "Rain: Slight, moderate and heavy intensity",
  66: "Freezing Rain: Light and heavy intensity",
  67: "Freezing Rain: Light and heavy intensity",
  71: "Snow fall: Slight, moderate, and heavy intensity",
  73: "Snow fall: Slight, moderate, and heavy intensitys",
  75: "Snow fall: Slight, moderate, and heavy intensity",
  77: "Snow grains",
  80: "Rain showers: Slight, moderate, and violent",
  81: "Rain showers: Slight, moderate, and violent",
  82: "Rain showers: Slight, moderate, and violent",
  85: "Snow showers slight and heavy",
  86: "Snow showers slight and heavy",
  95: "Thunderstorm: Slight or moderate",
  96: "Thunderstorm with slight and heavy hail",
  99: "Thunderstorm with slight and heavy hail",
};

let loading = false;
let error;

const weatherData = {
  set(key, data) {
    const ttl = 10 * 60 * 1000;
    const cachedData = {
      data: data,
      expiry: Date.now() + ttl,
    };

    sessionStorage.setItem(key, JSON.stringify(cachedData));
  },

  get(key) {
    const cachedData = sessionStorage.getItem(key);
    if (!cachedData) return null;

    const parsedItem = JSON.parse(cachedData);
    if (Date.now() > parsedItem.expiry) {
      sessionStorage.removeItem(key);
      return null;
    }

    return parsedItem.data;
  },
};

function showError(visibe, error = "") {
  const errorSpan = document.getElementById("error");

  if (visibe) {
    errorSpan.style.display = "block";
    errorSpan.textContent = error;
  } else {
    errorSpan.style.display = "none";
    errorSpan.textContent = "";
  }
}

function showSkeleton(visibe) {
  console.log(visibe);

  const skeletons = document.querySelectorAll(".skeleton");
  const pDetails = document.querySelectorAll(".details");
  if (visibe) {
    skeletons.forEach((ske) => {
      ske.style.display = "block";
    });
    pDetails.forEach((p) => {
      p.style.display = "none";
    });
  } else {
    skeletons.forEach((ske) => {
      ske.style.display = "none";
    });
    pDetails.forEach((p) => {
      p.style.display = "block";
    });
  }
}

async function fetchWeather(url) {
  try {
    error = "";
    showError(false, error);
    loading = true;
    showSkeleton(true);
    console.log("loading: ", true);

    const response = await fetch(url);
    const result = await response.json();
    loading = false;
    console.log("loading: ", loading);
    if (!response.ok) {
      throw new Error("error happened response is not ok");
    }

    showSkeleton(false);

    return result;
  } catch (err) {
    loading = false;
    showSkeleton(false);
    console.log("error while fetching weather: ", err);

    error = "error while fetching weather";
    showError(true, error);
  }
}

const defaultURL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code,wind_speed_10m";

function renderWeather(temp, speed, desc, city = "") {
  const tempSpan = document.getElementById("temp");
  const speedSpan = document.getElementById("speed");
  const descSpan = document.getElementById("desc");
  const citySpan = document.getElementById("city");

  if (city !== "") {
    console.log(typeof city);

    citySpan.textContent = city;
  }

  tempSpan.textContent = temp;
  speedSpan.textContent = speed;
  descSpan.textContent = weatherCode[desc];
}

async function loadWeather(url = "", city = "") {
  try {
    error = "";
    showError(false, error);
    const weatherKey = city ? city : "Berlin";

    console.log("weather key: ", weatherKey);

    const weatherSessionData = weatherData.get(weatherKey);

    // console.log("weather session data: ", weatherSessionData.temp);

    console.log("session data: ", weatherSessionData);

    if (weatherSessionData) {
      renderWeather(
        weatherSessionData.temp,
        weatherSessionData.speed,
        weatherSessionData.code,
        weatherKey,
      );

      return;
    }

    if (!city) {
      const result = await fetchWeather(defaultURL);
      const temp = result.current.temperature_2m;
      const speed = result.current.wind_speed_10m;
      const code = result.current.weather_code;
      weatherData.set(weatherKey, { temp, speed, code });
      renderWeather(temp, speed, code);
    } else {
      const result = await fetchWeather(url);
      const temp = result.current.temperature_2m;
      const speed = result.current.wind_speed_10m;
      const code = result.current.weather_code;
      console.log("city: ", city);
      weatherData.set(weatherKey, { temp, speed, code });
      renderWeather(temp, speed, code, city);
    }
  } catch (err) {
    console.log("error while loading weather: ", err);
    error = "error while loading weather";
    showError(true, error);
  }
}

loadWeather();

const searchBtn = document.getElementById("search-button");

searchBtn.addEventListener("click", async (e) => {
  try {
    error = "";
    showError(false, error);
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.remove();
    });

    e.preventDefault();
    const searchValue = document.getElementById("city-input").value;
    if (searchValue) {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchValue}&count=5&language=en&format=json`,
      );

      const result = await response.json();

      console.log(result);

      const ul = document.getElementById("list-contanier");

      result.results.forEach((element) => {
        const li = document.createElement("li");
        li.textContent = `${element.name}, ${element.country}`;
        li.addEventListener("click", (e) => {
          console.log("element name: ", element.name);

          loadWeather(
            `https://api.open-meteo.com/v1/forecast?latitude=${element.latitude}&longitude=${element.longitude}&current=temperature_2m,weather_code,wind_speed_10m`,
            `${element.name} , ${element.country}`,
          );
          const allLi2 = document.querySelectorAll("li");
          allLi2.forEach((li) => {
            li.remove();
          });
        });
        ul.appendChild(li);
      });
    }
  } catch (err) {
    console.log("error: awe", err);
    error = "enter a valid city name";
    showError(true, error);
  }
});
