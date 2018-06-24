// Global observable array for our map markers
filteredMarkers = ko.observableArray();

// Our view model
ViewModel = function () {
  var self = this;
  // Filter ID observable to filter our observable array on user input
  self.filter_id = ko.observable(0);
  // Observable array to hold the markers for the list view
  self.listView = ko.observableArray();
  // Opens infowindow on list item click
  self.openListWindow = function () {
    var marker = this;
    populateInfoWindow(this, largeInfowindow);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
      marker.setAnimation(null);
    }, 750);
  };
  // Filters markers and list view based on observable filter number
  self.filterMarkers = ko.computed(function () {
    var bounds = new google.maps.LatLngBounds();
    self.filterM = filteredMarkers();
    filterLen = self.filterM.length;
    var i;
    // If category = 0(our all filter), show all markers
    if (self.filter_id() == 0) {
      for (i = 0; i < filterLen; i++) {
        self.filterM[i].setVisible(true);
        bounds.extend(self.filterM[i].position);
        self.listView.push(self.filterM[i]);
      }
    } else {
      self.listView.removeAll();
      //  Show markers if matching filter number, hide if not matching
      for (i = 0; i < filterLen; i++) {
        if (self.filter_id() == self.filterM[i].category) {
          self.filterM[i].setVisible(true);
          bounds.extend(self.filterM[i].position);
          self.listView.push(self.filterM[i]);
        }
        if (self.filter_id() !== self.filterM[i].category) {
          self.filterM[i].setVisible(false);
        }
      }
    }
    // Sets map bounds after altering visible markers
    map.fitBounds(bounds);
  });
  // Sets filter_id to clicked filter nummber from the UI
  self.filter = function (category) {
    self.filter_id(category);
  };
};
// Initializes the map
initMap = function () {
  var self = this;
  // Google Map stylings
  var styles = [
    {
      "elementType": "geometry",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#8ec3b9"
      }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1a3646"
      }]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#4b6878"
      }]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#64779e"
      }]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#4b6878"
      }]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#334e87"
      }]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [{
        "color": "#023e58"
      }]
    },
    {
      "featureType": "poi",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#283d6a"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#6f9ba5"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#023e58"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#3C7680"
      }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "color": "#304a7d"
      }]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#98a5be"
      }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "color": "#2c6675"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#255763"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#b0d5ce"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#023e58"
      }]
    },
    {
      "featureType": "transit",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#98a5be"
      }]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#283d6a"
      }]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [{
        "color": "#3a4762"
      }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#0e1626"
      }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#4e6d70"
      }]
    }
  ];
  // Sets the map chacteristics and links to html component as map variable
  self.map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 42.098687,
      lng: -75.917974
    },
    zoom: 13,
    styles: styles,
    mapTypeControl: false
  });
  largeInfowindow = new google.maps.InfoWindow();
  // Creates markers for the map using data from our restaurants model
  resLen = self.restaurants.length;
  for (var i = 0; i < resLen; i++) {
    // Set markers positions from restaurant data
    self.position = restaurants[i].location,
      self.title = restaurants[i].title,
      // Custom icon location
      self.image = 'img/icon_ch.png',
      // FourSquare Venue ID
      self.FS_id = restaurants[i].FS_id,
      // Restaurant Category for our filter
      self.category = restaurants[i].category,
      // Marker object with its components
      self.marker = new google.maps.Marker({
        position: self.position,
        title: self.title,
        animation: google.maps.Animation.DROP,
        icon: self.image,
        id: i,
        FS_id: self.FS_id,
        category: self.category,
      });
    // Pushes generated marker to aur array
    self.filteredMarkers().push(self.marker);

    // Creates infowindow when marker is clicked
    self.populateInfoWindow = function (marker, infowindow) {
      // Check to make sure the infowindow is not already open
      if (infowindow.marker != marker) {
        // Clears the infowindow content
        infowindow.setContent('');
        infowindow.marker = marker;

        // Request FourSquare API info from specific URLs using our API key and secret
        var restaurant_tips = 'https://api.foursquare.com/v2/venues/' + marker.FS_id + '/tips?' +
          '&client_id=OUY1LAW0VZ33TA1NQMWCSNDLOXN4ZUZCC2XJQII2RBVXN4XX' +
          '&client_secret=UG0NWNGHN1RW2CZHGKJKEKOF2LGNOWVSWOSQU1NDKVZPSDUC' +
          '&v=20180530';

        // Grabs JSON and then stores data from JSON as created variables    
        $.getJSON(restaurant_tips).done(function (data) {
          var response = data.response.tips.items[0];
          self.tips = response.text;
          self.user = response.user.firstName;

          // What info/formatting will appear in the infowindow
          self.details = '<h5>' + marker.title + '</h5>' +
            '<h6>' + self.user + '</h6>' +
            '"' + self.tips + '"';

          // Sets infowindow to retrieved information from API
          infowindow.setContent(self.details);

          //Returns error message if unable to connect to API
        }).fail(function () {
          infowindow.setContent('Could not connect to Four Square');
        });
        // Clears infowindow on close
        infowindow.addListener('closeclick', function () {
          infowindow.marker = null;
        });
        // Open the infowindow on the clicked marker
        infowindow.open(map, marker);
      }
    };
    // Creates clickable event on marker, sets function for said event
    self.marker.addListener('click', function () {
      var marker = this;

      self.populateInfoWindow(this, largeInfowindow);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function () {
        marker.setAnimation(null);
      }, 750);
    });

  }
  // Toggles markers on
  showMarkers = function () {
    var bounds = new google.maps.LatLngBounds();
    filMarLen = self.filteredMarkers().length;
    
    for (var i = 0; i < filMarLen; i++) {
      self.filteredMarkers()[i].setMap(self.map);
      bounds.extend(self.filteredMarkers()[i].position);
    }
    self.map.fitBounds(bounds);
  };
  showMarkers();

  var vm = new ViewModel();
  ko.applyBindings(vm);
};
// Initializes the map
initMap();
// Google error handling
window.googleError = function () {
  alert("An error while loading Google Maps occurred, please try to reload the page.");
};
