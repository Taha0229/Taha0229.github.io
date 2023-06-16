const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
// const fetch = require("node-fetch")
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;

const sheet_id = "1AT1E9kEyy6NWFVj8QPz-Wkh2lkPjKjBlNOjAryDc2oA" 
const sheet_name = "form_data"
const api_endpoint = "https://sheetdb.io/api/v1/3zfu68p8npv9c"


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

app.get('/', (req, res) => {


fetch(api_endpoint)
.then((response) => response.json())
.then((data) => console.log(data));
      res.render('index')
    
})

app.post('/', (req,res) =>{
    console.log('hello')

    let data_body =  {
        id: "INCREMENT",
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        branch: req.body.branch,
      }

    fetch(api_endpoint, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    data: [data_body]
  })
}).then(r => r.json()).catch(err => console.log(err))
.then(result => console.log(result))

    res.redirect('https://vyapam.cgstate.gov.in/index.php/node/Exam%20Form')
}) 



app.listen(port, (req, res) => {
    console.log("server @ " + port);
});