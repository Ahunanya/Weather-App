const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/index.html");
  
})

app.post("/", function (req, res) {


  const query = req.body.cityName;
  const apiKey = "73d35fa6bb9184912afae18675f316f3";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/w/" + icon + ".png";
      res.write("<h1>The temperature in "+ query + " is " + temp + " degree Celsius.</h1>");
      res.write("<p>The weather is currently " + weatherDescription + ".</p>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server is running on port 3000")   
})