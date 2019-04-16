//creating server to view our work in webpage
const path = require('path') //path module provide the directories  and file path that can be used
const express = require('express')

console.log(__dirname) // it will give the directory name where current file is located
//console.log(__filename)// it will give the file name where current file is located
console.log(path.join(__dirname, '../public/index.html')) //by passing dirname and the path you want to go join()will combine the cmd

const publicPath = path.join(__dirname, '../public')

const app = express()
app.use(express.static(publicPath))


// app.get('', (req, res)=>{ // it passes two argument one is the directory where to go and another is function
//                     //in function it takes two arguments one is request (req) and response(res) of that url
//     res.send('<h1>Weather</h1>') // it will send the response to the browser

// }) no loger to use this we are directing direcly from publicpath

// app.get('/help', (req, res)=>{
//     res.send([{
//         name: "Ashrad"
//     }, {
//         age: 27
//     }])
// })

//we can call es-6 short hand functions
//app.get('/about', (req, res)=>  res.send("<h1>About</h1>"))

app.get("/weather", (req, res)=> res.send({
    location:"Dallas",
    forecast: 49
}))

//runing server
app.listen(3000, ()=>{  //this is the port send to browser to get the response and another callback function
    console.log('server is up on port 3000')
})