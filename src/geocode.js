const request = require('request')

const getGeoCode = (cityname, callback) => {
    const geourl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + cityname + ".json?access_token=pk.eyJ1IjoiZ2FuZXNhbnQiLCJhIjoiY2tvZzA1dzcyMGx1eTJvanoxcGNsZXZuYSJ9.8DNBZF1Nu9CHuX3XUt2bDg&limit=1"

    //console.log(geourl)
    request({ url: geourl, json: true }, (error, response) => {
        if (error) {
            // console.log("something went wrong")
            callback('something went wrong', undefined)
        } else if (response.body.features.length === 0) {
            // console.log("Entered city doesn't exists")
            callback("Entered city doesn't exists", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
            // const latitude = response.body.features[0].center[0]
            // const longitude = response.body.features[0].center[1]

        }
    })
}


const getCordinates = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=712af19a53daf43db799ffbd7a092f2a&query=" + longitude + "," + latitude + "&units=m&limit=1"
    //console.log(url)

    request({ url: url, json: true }, (error, response) => {

        // console.log(response.body)
        if (error) {
            //console.log("something went wrong")
            callback('something went wrong', undefined)
        } else if (response.body.error) {
           // console.log("Entered city doesn't exists")
            callback(response.body.error.info, undefined)
        } else {
            //console.log('Country: ' + response.body.location.country + ' State: ' + response.body.location.region + ' Temperature measurement place: ' + response.body.location.name)
            callback(undefined,('It is currently ' + response.body.current.temperature + ' degress out. It is looks like a ' + response.body.current.feelslike + ' degress out.'))
        }
    })
}



module.exports = {
    getGeoCode: getGeoCode,
    getCordinates: getCordinates
}
