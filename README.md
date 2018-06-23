# Neighborhood Map

Tis is a neighborhood map utilizing Google Maps API and FourSquare API to display the location and reviews of Chinese Restaurants in the Greater Binghamton Area, complete with a filter to further filter by type of cuisine.

## Getting Started

Step One
```
Download Repository
```

Step Two
```
Open index.html inside of a modern web browser
```
### Using Your Own API keys

API calls are usually limited to a certain number of calls per day, depending on the API provider and any potential plans offered by said providers. To get around the limits of my developer account, you can use your own API keys by making a few simple tweaks.

Step One
```
Create an account with the provider of your API key
```
In this case we have both the Google Maps API and the Four Square API.

[Google](https://console.cloud.google.com)

[Four Square](https://developer.foursquare.com/)

With an account we can now get our own API keys and insert them into our code.

Google API is initialized in index.html with a script source. We can insert our newly acquired key here where I've written INSERT_KEY_HERE
```
<script src="https://maps.googleapis.com/maps/api/js?v=3&key=INSERT_KEY_HERE" onerror="googleError()">
</script> 
```
Four Square API is initialized in app.js and requires both a client id and a client secret. We can insert our newly acquired keys here where I've written INSERT_ID_HERE and INSERT_SECRET_HERE.
```
var restaurant_tips = 'https://api.foursquare.com/v2/venues/' + marker.FS_id + '/tips?' +
            '&client_id=INSERT_ID_HERE' +
            '&client_secret=INSERT_SECRET_HERE'
```
## Acknowledgments

* Udacity FullStack Nanodegree Program
* Udacity Discourse Forum
* [Official Google Maps API Documentation](https://developers.google.com/maps/documentation/)
* [Official FourSquare API Documentation](https://developer.foursquare.com/docs)
* [Official Knockout.js Documentation](http://knockoutjs.com/)
* [Knockout Filtering an Observable Array](https://stackoverflow.com/questions/20857594/knockout-filtering-on-observable-array)
* Udacity JQuery Course
* Udacity Javascript Course
* Udacity Object Oriented Javascript Course
