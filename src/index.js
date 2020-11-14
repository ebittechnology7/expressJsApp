var path = require("path");
var hbs = require("hbs");
var port = 8000;
const keName = "weather";
const apiKey = "6ee379affe04e328154e777dd31db87d"; 


var express = require("express");
var app = express();
var axios = require("axios");

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.localsAsTemplateData(app);


app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath); // change views folder for hbs
hbs.registerPartials(partialsPath);


app.locals.title = "Landed Theme";

app.get("/", (req, res) => {
    res.render("index", {
        myAccount: "My Account"
    }); 
});

app.get("/elements", (req, res) => {
    res.render("elements");
});

app.get("/get-city-weather-info", (req, res) => {
    let url = `api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=${apiKey}`;
    res.send(url);
        axios.get(url)
        .then(function(response){
            var data = JSON.parse(response);
            console.log(data);
        })
        .catch(function(error){
            console.log(error);
        })
        .then(function(){
            // always executed
        });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorNo: 'Error 404!',
        errorMsg: 'Oops... Page not found!'
    });
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});