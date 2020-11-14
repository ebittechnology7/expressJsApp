var path = require("path");
var hbs = require("hbs");
var port = 8000;

var express = require("express");
var app = express();

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

app.get('*', (req, res) => {
    res.render('404', {
        errorNo: 'Error 404!',
        errorMsg: 'Oops... Page not found!'
    });
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});