 var mapFlag = true;
 var entityIdUrl = encodeURI(localStorage.trackersEntityId);
 var oldItems;
 var oldItem;
 var alertItems;
 var alertItem;
 var lastAlertLatitude;
 var lastAlertLongitude;
 var infoWindow = null;
 var alertCity;

  $(document).ready(function () {
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
     $("#trackersWithoutReport").append("<tr><td>"+ (i+1) +"</td><td>"+ parseTime(msg.data.trackers[i].trackTimestamp) +"</td><td>"+ msg.data.trackers[i].firstName +"</td><td>"+ msg.data.trackers[i].lastName +"</td></tr>");
   }
   $("#operatorsLoader").remove();
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
        alertItems.sort(function(a, b){
          if (a.timestamp < b.timestamp) return -1;
          if (b.timestamp < a.timestamp) return 1;
          return 0;
        });
        alertItems.reverse();
        //$("#lastAlerts").empty();
        for (var i = 0, len = msg.data.tracks.length; i < len; i++) {
          alertItem = msg.data.tracks[i];
         //Listado de ultimas alertas
         $("#lastAlerts").append("<tr id='alertRow"+ i +"' style='cursor:pointer'><td>"+ (i+1) +"</td><td>"+ parseDate(msg.data.tracks[i].timestamp) +"</td><td>"+ msg.data.tracks[i].finalUserFirstName +" "+ msg.data.tracks[i].finalUserLastName +"</td><td>"+ showAlertType(msg.data.tracks[i].type) +"</td></tr>");

         //Eventos en filas del listado de ultimas alertas
         clickRowLastAlerts(i,alertItem.latitude,alertItem.longitude,alertItem.finalUserFirstName,alertItem.finalUserLastName,alertItem.trackerAni,alertItem.finalUserPhones,alertItem.finalUserPictureUrl);

       }
       $("#operatorsLoader").remove();
       $("#lastAlerts > tr:first-child").addClass("bg-info");
       initialShowMap();
       oldItems = msg.data.tracks;
     }
   } else {
    $("#lastAlerts").append("<div class='center-block'>No hay alertas disponibles</div>");
   }
 });
}

function reloadTopAlerts() {
  var plus = 0;
  var alertsFile = SERVER_URL+"/api/track/getLastAlerts?json={entityId%3A"+entityIdUrl+"}";
  $.getJSON(alertsFile, function(msg) {
    if(msg.status=="ok"){
      if (msg.data.tracks.length!==0) {
        var myLatlng;
        for (var i = 0, len = msg.data.tracks.length; i < len; i++) {
          alertItem = msg.data.tracks[i];
          var exists = false;
          if(oldItems !== undefined){
            for (var n = 0, leng = oldItems.length; n < leng; n++) {
                  //console.log(alertItem.id +" - "+ oldItems[n].id);
                  //console.log(n);
                  if (alertItem.id == oldItems[n].id) {
                    exists = true;
                  }
                }
                if (exists == false) {
                  plus = plus + 1;
                  var position = (len-1) + plus;
                  console.log(alertItem.id+" Plus: "+plus+" Position:"+position);
                  $("#alertRow"+position).addClass("bg-danger");
                  $("#lastAlerts").prepend("<tr id='alertRow"+ position +"'><td>"+ i +"</td><td>"+ parseDate(msg.data.tracks[i].timestamp) +"</td><td>"+ msg.data.tracks[i].finalUserFirstName +" "+ msg.data.tracks[i].finalUserLastName +"</td><td>"+ showAlertType(msg.data.tracks[i].type) +"</td></tr>");
                  $("#alertRow"+position).addClass("bg-danger");
                  clickRowLastAlerts(position,alertItem.latitude,alertItem.longitude,alertItem.finalUserFirstName,alertItem.finalUserLastName,alertItem.trackerAni,alertItem.finalUserPhones,alertItem.finalUserPictureUrl);
                  showMap(alertItem.latitude,alertItem.longitude,alertItem.finalUserFirstName,alertItem.finalUserLastName,alertItem.trackerAni,alertItem.finalUserPhones,alertItem.finalUserPictureUrl);
                  deleteOlderAlert();
                  orderAlertPosition();
                }
              }
            }
            oldItems = msg.data.tracks;
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
    $("#lastAlerts > tr").removeClass("bg-info");//.removeClass("bg-danger");
    $("#lastAlerts > tr#alertRow"+i).addClass("bg-info");
    $("#lastAlerts > tr#alertRow"+i+".bg-danger").click(function(){
      $(this).removeClass("bg-danger");
    });
  });
}
function showMap(alertLat,alertLong,finalUserFirstName,finalUserLastName,trackerAni,finalUserPhones,finalUserPictureUrl){
    myLatlng = new google.maps.LatLng(alertLat,alertLong);
    getAddress(alertLat,alertLong);
    initialize(myLatlng,finalUserFirstName,finalUserLastName,trackerAni,finalUserPhones,finalUserPictureUrl);
    //google.setOnLoadCallback(initialize);
}
function initialShowMap (){
  if (mapFlag === true) {
      var lastAlert = 0;
      showMap(alertItems[lastAlert].latitude,alertItems[lastAlert].longitude,alertItems[lastAlert].finalUserFirstName,alertItems[lastAlert].finalUserLastName,alertItems[lastAlert].trackerAni,alertItems[lastAlert].finalUserPhones,alertItems[lastAlert].finalUserPictureUrl);
  }
}
// function clickRemoveClass(elem){
//   $(elem).removeClass();
// }
function showAlertType(alertType){
  if(alertType==1){
    return "<span class='label label-danger'>P&aacute;nico</span>";
  } else if(alertType==2) {
    return "<span class='label label-warning'>Emergencia</span>";
  } else if (alertType==3){
    return "<span class='label label-info'>Ca&iacute;da Libre</span>";
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
function getAddress(latitude,longitude){
  var file = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude +","+ longitude +"&AIzaSyCLrK2IeysyliNYn655pINuagMXLqRNVjU&sensor=false";
  $.getJSON(file, function(result){
    if(result.status=="OK"){
       alertCity = result.results[1].address_components[0].long_name+" ,"+result.results[1].address_components[1].long_name;
    }
  });
}
function initialize(mapLatyLong,finalUserFirstName,finalUserLastName,trackerAni,finalUserPhones,finalUserPictureUrl) {
  //var geocoder;
  //geocoder = new google.maps.Geocoder();
  var mapOptions = {
    center: mapLatyLong,
    zoom: 14
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
  var contentString = '<div class="container-fluid">'+
      '<div class="col-md-2 col-lg-2 pull-left" style="padding-left:0">'+
      '<img src="'+ SERVER_URL + finalUserPictureUrl +'"onerror="this.onerror=null;this.src=\''+ IMG_URL +'/user_avatar.png\'" class="img-circle alertFace";">'+
      '</div>'+
      '<div class="col-md-2 col-lg-2"></div>'+
      '<div class="col-md-8 col-lg-8">'+
      '<span style="font-weight:bold">'+finalUserFirstName+' '+finalUserLastName+'</span></br>'+
      '<span>Tel: '+finalUserPhones+'</span></br>'+
      '<span style="font-size:.9em;width:100%">ANI: '+trackerAni+'</span></br>'+
      '<span class="text-primary">'+alertCity+'</span>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 275
  });
  var marker = new google.maps.Marker({
    position: myLatlng,
    animation: google.maps.Animation.DROP,
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
  // To add the marker to the map, call setMap();
  marker.setMap(map);
  setTimeout(function(){infowindow.open(map,marker);}, 1000);
  //var checkMapLoadFn = setInterval(function(){checkMapLoad()},500);

  // function checkMapLoad(){
  //  if (marker.position !== NaN){
  //   infowindow.open(map,marker);
  //   clearInterval(checkMapLoadFn);
  //   }
  //   console.log(marker.position);
  // }
}
function refresh(){
  setTimeout(function() {
      mapFlag = false;
      reloadTopAlerts();
      showTrackersWithoutReport();
      showReportSummary();
      showLastRefresh();
      refresh();

}, 30000); // Cada 2 minutos refresh
}
function showLastRefresh(){
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();

  if (minutes < 10)
  minutes = "0" + minutes;

  $("#showLastRefresh").html(hours + ":" + minutes + " " + "hs");
}
function orderAlertPosition(){
  $("#lastAlerts tr").each(function(index){
  $("#lastAlerts tr:nth-child("+index+") td:first-child").html(index);
  });
}
function deleteOlderAlert(){
  //var size = $("#lastAlerts tr").length();
    $("#lastAlerts tr").each(function(index){
      if (index > 20) {
         $("#lastAlerts tr:nth-child("+index+")").remove();
      }
  });
}



