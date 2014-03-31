 var mapFlag = true;
 var entityIdUrl = encodeURI(localStorage.trackersEntityId);
  $(document).ready(function () {
  var alertItems;
  var alertItem;
  var lastAlertLatitude;
  var lastAlertLongitude;
  showTopAlerts();
  showTrackersWithoutReport();
  showReportSummary();
  showLastRefresh();
  showMap();
  refresh();
});

function showTrackersWithoutReport() {
var trackersFile = SERVER_URL+"/api/tracker/getUnreported?json={entityId%3A"+entityIdUrl+"}";
$.getJSON(trackersFile, function(msg) {
  if(msg.status=="ok"){
    $("#trackersWithoutReport").empty();
    for (var i = 0, len = msg.data.trackers.length; i < len; i++) {
     $("#trackersWithoutReport").append("<tr><td>"+ i +"</td><td>"+ parseTime(msg.data.trackers[i].trackTimestamp) +"</td><td>"+ msg.data.trackers[i].imei +"</td></tr>");
   }
 }
});
}
function showReportSummary(){
  var file = SERVER_URL+"/api/tracker/getStatusSummary?json={entityId%3A"+entityIdUrl+"}";
  $.getJSON(file, function(result){
    if(result.status=="ok"){
      $("#totalReporting").html(result.data.reporting);
      $("#totalWithoutReporting").html(result.data.withoutReport);
  } else {
    //alert("no ok");
  }
});
}
function showTopAlerts() {
  var alertsFile = SERVER_URL+"/api/track/getLastAlerts?json={entityId%3A"+entityIdUrl+"}";
  $.getJSON(alertsFile, function(msg) {
    if(msg.status=="ok"){
      if (msg.data.tracks.length!==0) {
        var myLatlng;
        alertItems = msg.data.tracks;
        $("#lastAlerts").empty();
        for (var i = 0, len = msg.data.tracks.length; i < len; i++) {
          alertItem = msg.data.tracks[i];
         //Listado de ultimas alertas
         $("#lastAlerts").append("<tr id='alertRow"+ i +"'><td>"+ i +"</td><td>"+ parseDate(msg.data.tracks[i].timestamp) +"</td><td>"+ msg.data.tracks[i].entityId +"</td><td>"+ showAlertType(msg.data.tracks[i].type) +"</td></tr>");
         //Eventos en filas del listado de ultimas alertas
         clickRowLastAlerts(i,alertItem.latitude,alertItem.longitude,alertItem.finalUserFirstName,alertItem.finalUserLastName,alertItem.trackerAni,alertItem.finalUserPhones,alertItem.finalUserPictureUrl);
       }
       $("#lastAlerts > tr:first-child").addClass("bg-danger");
       initialShowMap();
     }
   } else {
    $("#lastAlerts").append("<div class='center-block'>No hay alertas disponibles</div>");
   }
 });
}
// Evento Click en filas del panel ultimas alertas reportadas
function clickRowLastAlerts(i,alertRowLat,alertRowLong,finalUserFirstName,finalUserLastName,trackerAni,finalUserPhones,finalUserPictureUrl) {
  $("#alertRow"+ i).on("click", function(){
    showMap(alertRowLat,alertRowLong,finalUserFirstName,finalUserLastName,trackerAni,finalUserPhones,finalUserPictureUrl);
    $("#lastAlerts > tr").removeClass("bg-danger");
    $("#lastAlerts > tr#alertRow"+i).addClass("bg-danger");
  });
}
function showMap(alertLat,alertLong,finalUserFirstName,finalUserLastName,trackerAni,finalUserPhones,finalUserPictureUrl){
    myLatlng = new google.maps.LatLng(alertLat,alertLong);
    initialize(myLatlng,finalUserFirstName,finalUserLastName,trackerAni,finalUserPhones,finalUserPictureUrl);
}
function initialShowMap (){
  if (mapFlag === true) {
      var lastAlert = alertItems.length-1;
      showMap(alertItems[lastAlert].latitude,alertItems[lastAlert].longitude,alertItems[lastAlert].finalUserFirstName,alertItems[lastAlert].finalUserLastName,alertItems[lastAlert].trackerAni,alertItems[lastAlert].finalUserPhones,alertItems[lastAlert].finalUserPictureUrl);
  }
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
  var month = myNewDate.getMonth()+1;
  var hours = myNewDate.getHours();
  var minutes = myNewDate.getMinutes();

  if (minutes < 10)
  minutes = "0" + minutes;

   return date +"-"+ month +" "+hours+":"+minutes;
}
function parseTime(trackTimestamp){
  var myNewTime = new Date(trackTimestamp);
  var hours = myNewTime.getHours();
  var minutes = myNewTime.getMinutes();

  if (minutes < 10)
  minutes = "0" + minutes;

   return hours+":"+minutes;
}
//Google Maps API Key: AIzaSyCLrK2IeysyliNYn655pINuagMXLqRNVjU
function initialize(mapLatyLong,finalUserFirstName,finalUserLastName,trackerAni,finalUserPhones,finalUserPictureUrl) {
  var mapOptions = {
    center: mapLatyLong,
    zoom: 14
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
  var contentString = '<div class="container-fluid">'+
      '<div class="col-md-2 col-lg-2 pull-left">'+
      '<img src="'+ IMG_URL + finalUserPictureUrl +'" onerror="this.onerror=null;this.src="'+ IMG_URL +'user_avatar.png" class="img-circle alertFace";">'+
      '</div>'+
      '<div class="col-md-2 col-lg-2"></div>'+
      '<div class="col-md-8 col-lg-8" style="padding-left:20px">'+
      '<span style="font-weight:bold">'+finalUserFirstName+' '+finalUserLastName+'</span></br>'+
      '<span>Tel: '+finalUserPhones+'</span></br>'+
      '<span>ANI: '+trackerAni+'</span>'+
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
      mapFlag = false;
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



