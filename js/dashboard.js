$(document).ready(function () {
  var lastAlertLatitude;
  var lastAlertLongitude;
  showTopAlerts();
  showTrackersWithoutReport();
  initialize();
  //google.maps.event.addDomListener(window, 'load', initialize);
});

function showTopAlerts() {
var alertsFile = "http://comovil.cloudapp.net/trackers/api/track/getAll?json=%7B%7D";
$.getJSON(alertsFile, function(msg) {
  if(msg.status=="ok"){
    lastAlertLatitude=msg.data.tracks[1].latitude;
    lastAlertLongitude=msg.data.tracks[1].longitude;
    for (var i = 0, len = msg.data.tracks.length; i < len; i++) {
     $("#lastAlerts").append("<tr><td>"+ i +"</td><td>"+ msg.data.tracks[i].timestamp +"</td><td>"+ msg.data.tracks[i].entityId +"</td><td>"+ msg.data.tracks[i].type +"</td></tr>");
     //alert(msg.data.tracks[i].entityId);
   }
 }
});
}
function showTrackersWithoutReport() {
var trackersFile = "http://comovil.cloudapp.net/trackers/api/tracker/getAll?json=%7B%7D";
$.getJSON(trackersFile, function(msg) {
  if(msg.status=="ok"){
    for (var i = 0, len = msg.data.trackers.length; i < len; i++) {
     $("#trackersWithoutReport").append("<tr><td>"+ i +"</td><td>"+ msg.data.trackers[i].imei +"</td><td>"+ msg.data.trackers[i].entityId +"</td></tr>");
     //alert(msg.data.tracks[i].entityId);
   }
 }
});
}

//Google Maps API Key: AIzaSyCLrK2IeysyliNYn655pINuagMXLqRNVjU
var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
function initialize() {
  var mapOptions = {
    center: myLatlng,
    zoom: 8
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });
  var marker = new google.maps.Marker({
    position: myLatlng,
    animation: google.maps.Animation.DROP,
    title:"Hello World!"
  });
  google.maps.event.addListener(marker, 'mouseover', function() {
    infowindow.open(map,marker);
  });

// To add the marker to the map, call setMap();
marker.setMap(map);
}

