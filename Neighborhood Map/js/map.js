var map;
// Create a new blank array for all the listing markers.
var markers = [];
// This global polygon variable is to ensure only ONE polygon is rendered.
var placeMarkers = [];

function initMap() {
    // Create a styles array to use with the map.
    var styles = [
        {
            featureType: 'water',
            stylers: [
                { color: '#19a0d8' }
            ]
        }, {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
                { color: '#ffffff' },
                { weight: 6 }
            ]
        }, {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
                { color: '#e85113' }
            ]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
                { color: '#efe9e4' },
                { lightness: -40 }
            ]
        }, {
            featureType: 'transit.station',
            stylers: [
                { weight: 9 },
                { hue: '#e85113' }
            ]
        }, {
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
                { visibility: 'off' }
            ]
        }, {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
                { lightness: 100 }
            ]
        }, {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                { lightness: -100 }
            ]
        }, {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                { visibility: 'on' },
                { color: '#f0e4d3' }
            ]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
                { color: '#efe9e4' },
                { lightness: -25 }
            ]
        }
    ];
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'),
        {
            center: { lat: 42.098687, lng: -75.917974 },
            zoom: 13,
            styles: styles,
            mapTypeControl: false
        });
    var locations = [
        { title: 'Buffet Star', location: { lat: 42.097379, lng: -75.976031 } },
        { title: "Wok N' Roll", location: { lat: 42.094491, lng: -75.976049 } },
        { title: 'Great China Buffet', location: { lat: 42.123179, lng: -75.970286 } },
        { title: 'China Lake', location: { lat: 42.106777, lng: -76.022672 } },
        { title: 'A Plus Sushi', location: { lat: 42.105558, lng: -75.924834 } },
        { title: 'China Wok East', location: { lat: 42.106188, lng: -75.888968 } },
        { title: 'New Century', location: { lat: 42.115167, lng: -75.955708 } },
        { title: 'China One', location: { lat: 42.098503, lng: -75.913619 } },
        { title: 'Fu Star', location: { lat: 42.089609, lng: -75.913927 } },
        { title: 'Hong Kong Chinese Restaurant', location: { lat: 42.092155, lng: -75.824931 } }
    ];
    var largeInfowindow = new google.maps.InfoWindow();
    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var image = 'img/icon_ch.png'
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: image,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        showMarkers();
        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function () {
            populateInfoWindow(this, largeInfowindow);
        });
    }
    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            // Clear the infowindow content to give the streetview time to load.
            infowindow.setContent('');
            infowindow.marker = marker;
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
            });
            var streetViewService = new google.maps.StreetViewService();
            var radius = 50;
            // In case the status is OK, which means the pano was found, compute the
            // position of the streetview image, then calculate the heading, then get a
            // panorama from that and set the options
            function getStreetView(data, status) {
                if (status == google.maps.StreetViewStatus.OK) {
                    var nearStreetViewLocation = data.location.latLng;
                    var heading = google.maps.geometry.spherical.computeHeading(
                        nearStreetViewLocation, marker.position);
                    infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov: {
                            heading: heading,
                            pitch: 30
                        }
                    };
                    var panorama = new google.maps.StreetViewPanorama(
                        document.getElementById('pano'), panoramaOptions);
                } else {
                    infowindow.setContent('<div>' + marker.title + '</div>' +
                        '<div>No Street View Found</div>');
                }
            }
            // Use streetview service to get the closest streetview image within
            // 50 meters of the markers position
            streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
            // Open the infowindow on the correct marker.
            infowindow.open(map, marker);
        }
    }
}
document.getElementById('filter-1').addEventListener('click', showMarkers);
document.getElementById('filter-2').addEventListener('click', showMarkers2);
document.getElementById('filter-3').addEventListener('click', showMarkers3);
document.getElementById('filter-4').addEventListener('click', showMarkers4);


// This function will loop through the markers array and display them all.
function showMarkers() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}
function showMarkers2() {
    hideMarkers();
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        if (markers.title = 'Fu Star'){
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
        }

    }
    map.fitBounds(bounds);
}
function showMarkers3() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}
function showMarkers4() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}


function hideMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}
// This is the PLACE DETAILS search - it's the most detailed so it's only
// executed when a marker is selected, indicating the user wants more
// details about that place.
function getPlacesDetails(marker, infowindow) {
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
        placeId: marker.id
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Set the marker property on this infowindow so it isn't created again.
            infowindow.marker = marker;
            var innerHTML = '<div>';
            if (place.name) {
                innerHTML += '<strong>' + place.name + '</strong>';
            }
            if (place.formatted_address) {
                innerHTML += '<br>' + place.formatted_address;
            }
            if (place.formatted_phone_number) {
                innerHTML += '<br>' + place.formatted_phone_number;
            }
            if (place.opening_hours) {
                innerHTML += '<br><br><strong>Hours:</strong><br>' +
                    place.opening_hours.weekday_text[0] + '<br>' +
                    place.opening_hours.weekday_text[1] + '<br>' +
                    place.opening_hours.weekday_text[2] + '<br>' +
                    place.opening_hours.weekday_text[3] + '<br>' +
                    place.opening_hours.weekday_text[4] + '<br>' +
                    place.opening_hours.weekday_text[5] + '<br>' +
                    place.opening_hours.weekday_text[6];
            }
            if (place.photos) {
                innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
                    { maxHeight: 100, maxWidth: 200 }) + '">';
            }
            innerHTML += '</div>';
            infowindow.setContent(innerHTML);
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
            });
        }
    });
}


initMap();