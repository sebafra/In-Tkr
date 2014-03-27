$(document).ready(function () {
  var lastAlertLatitude;
  var lastAlertLongitude;
  showTopAlerts();
  showTrackersWithoutReport();
  showReportSummary();
  showLastRefresh();
  refresh();
});

function showTrackersWithoutReport() {
var trackersFile = "http://comovil.cloudapp.net/trackers/api/tracker/getAll?json=%7B%7D";
$.getJSON(trackersFile, function(msg) {
  if(msg.status=="ok"){
    $("#trackersWithoutReport").empty();
    for (var i = 0, len = msg.data.trackers.length; i < len; i++) {
     $("#trackersWithoutReport").append("<tr><td>"+ i +"</td><td>"+ msg.data.trackers[i].imei +"</td><td>"+ msg.data.trackers[i].entityId +"</td></tr>");
   }
 }
});
}
function showReportSummary(){
  var file = "json/report-summary.jsp";
  $.getJSON(file, function(result){
    if(result.status=="ok"){
      $("#totalReporting").html(result.data.trackersReporting);
      $("#totalWithoutReporting").html(result.data.trackersWithoutReport);
  }});
}
function showTopAlerts() {
  var alertsFile = "http://comovil.cloudapp.net/trackers/api/track/getAll?json=%7B%7D";
  $.getJSON(alertsFile, function(msg) {
    if(msg.status=="ok"){
      if (msg.data.tracks.length!==0) {
        var myLatlng;
        $("#lastAlerts").empty();
        for (var i = 0, len = msg.data.tracks.length; i < len; i++) {
         $("#lastAlerts").append("<tr id='alertRow"+ i +"'><td>"+ i +"</td><td>"+ parseDate(msg.data.tracks[i].timestamp) +"</td><td>"+ msg.data.tracks[i].entityId +"</td><td>"+ showAlertType(msg.data.tracks[i].type) +"</td></tr>");
         clickRowLastAlerts(i,msg.data.tracks[i].latitude,msg.data.tracks[i].longitude);
       }
       $("#lastAlerts > tr:first-child").addClass("bg-danger");
        var lastAlert = msg.data.tracks.length-1;
        showMap(msg.data.tracks[lastAlert].latitude,msg.data.tracks[lastAlert].longitude);
     }
   } else {
    $("#lastAlerts").append("<div class='center-block'>No hay alertas disponibles</div>");
   }
 });
}
// Evento Click en filas del panel ultimas alertas reportadas
function clickRowLastAlerts(i,alertRowLat,alertRowLong) {
  $("#alertRow"+ i).on("click", function(){
    showMap(alertRowLat,alertRowLong);
    $("#lastAlerts > tr").removeClass("bg-danger");
    $("#lastAlerts > tr#alertRow"+i).addClass("bg-danger");
  });
}
function showMap(alertLat,alertLong){
  myLatlng = new google.maps.LatLng(alertLat,alertLong);
  initialize(myLatlng);
}
function showAlertType(alertType){
  if(alertType==1){
    return "P&aacute;nico";
  } else if(alertType==2) {
    return "Emergencia";
  } else if (alertType==3){
    return "Ca&iacute;da Libre";
  }
}

function parseDate(currentField){
  var myNewDate = new Date(currentField);
  var date = myNewDate.getDate();
  var month = myNewDate.getMonth();
  var hours = myNewDate.getHours();
  var minutes = myNewDate.getMinutes();

  if (minutes < 10)
  minutes = "0" + minutes;

   return date +"-"+ month +" "+hours+":"+minutes;
}

//Google Maps API Key: AIzaSyCLrK2IeysyliNYn655pINuagMXLqRNVjU
function initialize(mapLatyLong) {
  var mapOptions = {
    center: mapLatyLong,
    zoom: 14
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
  var contentString = '<div class="container-fluid">'+
      '<div class="col-md-2 col-lg-2 pull-left">'+
      '<img src="img/face.jpg" class="img-circle alertFace">'+
      '</div>'+
      '<div class="col-md-2 col-lg-2"></div>'+
      '<div class="col-md-8 col-lg-8" style="padding-left:20px">'+
      '<span style="font-weight:bold">Lara Sanchez</span></br>'+
      '<span>Tel: 011 425 3687</span></br>'+
      '<span>ANI: 12542536784</span>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 250
  });
  var marker = new google.maps.Marker({
    position: myLatlng,
    animation: google.maps.Animation.DROP,
  });
  google.maps.event.addListener(marker, 'mouseover', function() {
    infowindow.open(map,marker);
  });

// To add the marker to the map, call setMap();
marker.setMap(map);
}
function refresh(){
  setTimeout(function() {
      showTopAlerts();
      showTrackersWithoutReport();
      showReportSummary();
      showLastRefresh();
      refresh();
}, 180000);
}
function showLastRefresh(){
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();

  if (minutes < 10)
  minutes = "0" + minutes;

  $("#showLastRefresh").html(hours + ":" + minutes + " " + "hs");
}



