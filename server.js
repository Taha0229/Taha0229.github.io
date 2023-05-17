const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch")
// import fetch from 'node-fetch';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

let data = []

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req,res) =>{
    console.log('hello')

    // let userData = {
    //     fName : req.body.first_name,
    //     lName : req.body.last_name,
    //     email : req.body.email,
    //     phone: req.body.phone,
    //     class: class_,
    // }

    
    let url = 'https://api.sheety.co/9b9344bc9523ff5f2c368e3f714f372f/testingFormSheet/sheet1';
    let body = {
      sheet1: {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        branch: req.body.branch
      }
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 
            'application/json;charset=utf-8'
    },
      body: JSON.stringify(body)
    })
    .then((response) => response.json())

    res.redirect('/')
}) 



app.listen(8080, (req, res) => {
    console.log("server @ 8080");
});