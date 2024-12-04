// do npm init -y to create package.json
// install express, ejs
// require express, path
let express = require("express");
let path = require("path");
const app = express();

// define a port 
const port = 8080;


// listen for requests
// do nodemon index.js and open localhost:8080
app.listen(port, () => {
    console.log("App is listening on port 8080");
})


// setup EJS & create views folder
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"./views"));


// link static files for better CSS and JS
app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public")))


// respond to request by sending home page 
app.get("/", (req, res) => {
    res.render("home.ejs");
})


// store the username and return the name
app.get("/insta/:username", (req,res) => {
    let {username} = req.params;
    res.render("account",{username});
})


// store and send data from the pseudo database
app.get("/i/:username", (req,res) => {
    let {username} = req.params;

    // store the data coming from database
    const instadata = require("./data.json");

    // pull and store username specific data
    let data = instadata[username];
    // console.log(data);

    // send data of username = dogs || cats
    res.render("backendInsta", {data})
})



// for an undefined path, remember to add it in the last of all the defined paths 
app.get("*",(req,res) => {
    res.send("Error 404, path doesn't exist");
})