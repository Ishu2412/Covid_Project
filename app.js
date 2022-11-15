const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const country = req.body.countryName;
  const apiKey = "0776cf6731mshd6d235133fe3cb2p16ace8jsn8f30d9ef18cf";
  const url = "https://covid-19-tracking.p.rapidapi.com/v1/" + country + "?rapidapi-key=" + apiKey;
  https.get(url, function(response){

  response.on("data", function(data){
    const covidData = JSON.parse(data);
    const lastUpdate = covidData['Last Update'];
    const totalCases = covidData['Total Cases_text'];
    const totalDeath = covidData['Total Deaths_text'];
    const totalRecovered = covidData['Total Recovered_text'];
    res.write("<p>Last Updated on = "+ lastUpdate + "</p>");
    res.write("<h1>In " + country + " = " + "</h1>");
    res.write("<h2>Total number of Cases = " + totalCases + "</h2>");
    res.write("<h2>Total number of Deaths = " + totalDeath + "</h2>");
    res.write("<h2>Total number of Recovered = " + totalRecovered + "</h2>");
    res.write("<img src=https://www.statnews.com/wp-content/uploads/2020/02/Coronavirus-CDC-645x645.jpg >");
    res.send();
    })
  })
})


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
