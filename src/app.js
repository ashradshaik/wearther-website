//nodemon command for running all files (nodemon path -e js,hbs) 

//creating server to view our work in webpage
const path = require('path') //path module provide the directories  and file path that can be used

//Creates an Express application. The express() function is a top-level function exported by the express module.
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')
const app = express() 
const prot = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//hbs - handlebars is a method that we can use dynamically (header, footer) for all pages

// defining paths for express config 
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
 
//setup handlebars engine and views location
app.set('view engine', 'hbs') // the set will will view the engine to the hbs file and load into the server 
                            //  (default look in views folder but we don't have)                            
app.set('views', viewPath) //replacing the views folder to the path we created
hbs.registerPartials(partialPath) //takes the path where partials located

//setup static directory to server
app.use(express.static(publicPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: "Weather app",
        name:"Ashrad"
    }) //render will callback the function with the respective option(argument) from app.set hbs
})

app.get('/about', (req, res)=>{
    res.render("about",{
        title: "About me",
        name:"Ashrad"
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title:"Help page",
        helpText:"Help ful text",
        name: "Ashrad"
    })
})

app.get("/weather", (req, res)=> {
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }
    let address = req.query.address
    geocode(address, (error, {latitute, longitute, location} = {})=>{
        if(error){
           // console.log(error)
           return res.send({ error })
        }
        forecast(longitute, latitute, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecastData: forecastData,
                location,
                address: address
            })
        })
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide search value"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
   res.render('404', {
        title:"404",
        name:"Ashrad",
        errorMessage:"Help Artilce Not Found. "
   })
})

app.get('*', (req, res)=>{ //* is match anything
   res.render('404', {
       title:"404",
       name:"Ashrad",
       errorMessage:"Page Not Found."
   })
})

//runing server
app.listen(port, ()=>{  //this is the port send to browser to get the response and another callback function
    console.log('server is up on port'+port)
})