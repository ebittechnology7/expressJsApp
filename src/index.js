var path = require("path");
var hbs = require("hbs");
var port = 8000;

var express = require("express");
var app = express();

const staticPath = path.join(__dirname, "../public");
const partialPath = path.join(__dirname, "../views/partials");
hbs.localsAsTemplateData(app);


app.use(express.static(staticPath));
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

// app.set("views", "templates"); // change views folder for hbs

app.locals.title = "Landed HTML5";

app.get("/", (req, res) => {
    res.render("index", {
        myAccount: "My Account"
    }); 
});
app.get("/", (req, res) => {
    console.log('This is home page');
});

app.get('*', (req, res) => {
    res.render('404', {
        errorNo: 'Error 404!',
        errorMsg: 'Oops... Page not found!'
    });
})



app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});