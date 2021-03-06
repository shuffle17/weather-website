const request = require('request')

const geocode = (data, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    data +
    '.json?access_token=pk.eyJ1Ijoic2h1ZmZsZTE3IiwiYSI6ImNrdHk0dGpmajFhdjAybm14d3lndjRzb3QifQ._9Ie-grFaqcKwvJR4tSjOw'
  request({ url, json: true }, (error, response) => {
    if (error) {
      // console.log('unable to connect with the geocoding services');
      callback('unable to connect with the geocoding services', undefined)
    } else if (response.body.message || response.body.features.length == 0) {
      callback(
        'the place you have been searching for is not on earth.try another search',
        undefined
      )
    } else {
      const position = response.body.features[0].center
      console.log('latitude is ' + position[1] + ' longitude is ' + position[0])
      callback(undefined, {
        latitude: position[1],
        longitude: position[0],
        place: response.body.features[0].place_name,
      })
    }
  })
}

module.exports = geocode
