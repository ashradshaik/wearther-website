//fetching the data from the url and then it will do the call back fucntion.
//inside the callback we again making that url into json and then againg passing the data into a callback function
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// }) 

// fetch("http://localhost:3000/weather?address=Tirupati").then((response)=>{
//     response.json().then((data)=>{
//        if(data.error){
//            console.log(data.error)
//        }else{
//            console.log(data.location)
//            console.log(data.address)
//        }
//     })
// }) 

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')
const sendLocationButton = document.querySelector('#sendLocation')

//message1.textContent = "From Javascript"

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault() // e is an event it will prevent the default function that event has
    const location = search.value

    message1.textContent = "Loading ...."
    // message2.textContent = ""
    // message3.textContent = ""

    fetch("/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error
            }else{
                message1.textContent = "Location: "+data.location
                message2.textContent = "Address: "+data.address+", Temperature: "+data.forecastData.temperature+", Humidity:"+data.forecastData.humidity
                message3.textContent = "Summary:"+data.forecastData.summary+ ", Timezone: "+data.forecastData.timezone
                console.log(data)
            }
        })
    })
    console.log(location)
})

sendLocationButton.addEventListener('click', ()=>{
    
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        //console.log(position)

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        //console.log(`${latitude}, ${longitude}`)
        message1.textContent = "Loading ...."
        fetch("/location?latitude="+latitude+'&longitude='+longitude).then((response)=>{
            response.json().then((data)=>{
                message1.textContent = "Teparature: "+data.forecastData.temperature
                message2.textContent = "Summary:"+data.forecastData.summary+ ", Timezone: "+data.forecastData.timezone
                message3.textContent = "Humidity:"+data.forecastData.humidity     
            })
        })
    })
})