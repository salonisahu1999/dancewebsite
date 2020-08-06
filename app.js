const express = require("express");
const path = require("path");
const app = express();
//-----------------------------------------------------------------
// getting-started.js mongoose
const mongoose = require('mongoose');
const bodyparser=require("body-parser")
mongoose.connect('mongodb://localhost/contactdb', { useNewUrlParser: true });

const port = 80;
// Define mongoose schema:
const contactSchema = new mongoose.Schema({
    name: String,
    age:String,
    address:String,
    email:String

});
// Define mongoose model:
const Contact= mongoose.model('Contact', contactSchema);
//------------------------------------------------------------------
//EXPRESS STUFF:
app.use('/static', express.static('static'));
app.use = (express.urlencoded())

app.set('view engine', 'pug')  //set the template engine as pug
app.set('views', path.join(__dirname, 'views'));    //set the viewers directory 
app.get('/', (req, res) => {
    const param = {}
    res.status(200).render('home.pug', param);
})


app.get('/contact', (req, res) => {
    const param = {}
    res.status(200).render('contact.pug', param);
})

app.post('/contact', (req, res) => {
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("submitted to database successfully")
    }).catch(()=>{
        res.status(400).send("Item was not saved to database")
    }); 
    // res.status(200).render('contact.pug', myData);
})

//SERVING END POINTS
app.listen(port, () => {
    console.log(`port is running at ${port}`);
});
