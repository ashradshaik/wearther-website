const request = require('request')
const chalk = require('chalk')

const forecast = (longitute, latitute, callback) =>{
    const url = "https://api.darksky.net/forecast/2f968ac9663dc2a62ee85a8c1d1ec820/"+latitute+","+longitute+"/?units=si";
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback(chalk.red.inverse('Unable to ceoonect location'), undefined)
        } else if(body.error){
            //const body = body
            callback(chalk.red.inverse("Error "+body.code+" " + body.error), undefined)
        } else{
            callback(undefined, {
                summary: body.daily.data[0].summary,
                rainPercentage: body.currently.precipProbability+'%',
                temperature: body.currently.temperature,
                timezone: body.timezone
            })
        }
    })
}

module.exports = forecast