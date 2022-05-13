mapboxgl.accessToken =
  "pk.eyJ1IjoiYXllb2xhMDUiLCJhIjoiY2wyY2N3eDF2MDNkNjNra2cyNHJ2OHY4NyJ9.uJF6lcRPf-3hIqZ01Jfoig";
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  types: "country,region,place,postcode,locality,neighborhood",
});

geocoder.addTo("#geocoder");

// Get the geocoder results container.
const results = document.getElementById("result");
const loc = document.getElementById("loc");

// Add geocoder result to container.
geocoder.on("result", (e) => {
  longitude = JSON.stringify(e.result.center[0], null, 2);
  latitude = JSON.stringify(e.result.center[1], null, 2);
  fetch(
    `http://api.weatherstack.com/current?access_key=17a2d0262fecfa0ff49b992d55461f5a&query=${latitude},${longitude}&units=s`
  ).then((response) => {
    response
      .json()
      .then((data) => {
        loc.innerText = `${data.location.name}, ${data.location.region}`;
        results.innerText = `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out. and the humidity is ${data.current.humidity}%`;
      })
      .catch((e) => {
        console.log(e);
      });
  });
});

// Clear results container when search is cleared.
geocoder.on("clear", () => {
  results.innerText = "";
  loc.innerText = "";
});
