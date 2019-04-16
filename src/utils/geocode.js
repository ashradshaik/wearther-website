const request = require('request')
const chalk = require('chalk')

const geocode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYXNocmFkc2hhaWswMSIsImEiOiJjanVmenJzdDYwanhnM3pwM3EwYzJ5ZTVuIn0.QXpxcjF85BhBnJKWmAdC1g&limit=1"

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback(chalk.red.inverse('Unable to ceoonect location'), undefined)
         }else if(body.features.length === 0){
            callback("Invalid Location", undefined)
        } else{
            callback(undefined, {
                latitute: body.features[0].center[1],
                longitute: body.features[0].center[0],
                location: body.features[0].text
            })
        }
    })
}


module.exports =   geocode
