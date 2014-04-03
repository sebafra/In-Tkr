var entityIdUrl = encodeURI(localStorage.trackersEntityId);
var tracks;

$(document).ready(function () {
        initialize();
      });

function initialize () {
  showtracks();
  $("#table2csv").on("click",function(){
    $('#tracksListTable').table2CSV({
       delivery: 'download'
     });
  });
  orderEvents();
  $("#dropdownUl li").on("click",function(){
    filterList(this);
  });
}
function showtracks(){
 //var tracksFile = SERVER_URL+"/api/track/getTracing?json={entityId:%22"+ entityIdUrl +"%22}";
 var tracksFile = SERVER_URL+"/api/track/getTracing?json={entityId:%2230dc20e5-b2e9-6bc9-ac98-39f7637a798a%22}";
 $.getJSON(tracksFile, function(msg) {
  if(msg.status=="ok"){
    tracks=msg.data.tracks;
    tracks.sort(function(a, b){
          if (a.lastName < b.lastName) return -1;
          if (b.lastName < a.lastName) return 1;
          return 0;
      });
    $("#tracksList").empty();
    for (var i = 0; i < msg.data.tracks.length; i++) {
       filltracksList(i);
    }
    $("#loader").hide("fast");
    showListCount();
    } else {
      showAlert ("msg","danger",msg.error.message);
    }
  });
}
function filltracksList(i){
  $("#tracksList").append("<tr id='user"+i+"'><td>"+ parseDate(tracks[i].datetime) +"</td><td>"+ tracks[i].finalUserDni  +"</td><td>"+ tracks[i].finalUserFirstName +"</td><td>"+ tracks[i].finalUserLastName +"</td><td>"+ tracks[i].imei +"</td><td>"+ showType(tracks[i].type) +"</td></tr>");
}
function showListCount(){
  $("#tracksCount").html(tracks.length);
  if (tracks.length!=1) {
    $("#tracksCountTxt").html("tracks disponibles");
  } else {
    $("#tracksCountTxt").html("track disponible");
}
}
function parseDate(currentField){
  var myNewDate = new Date(currentField);
  var date = myNewDate.getDate();
  var month = myNewDate.getMonth()+1;
  var year = myNewDate.getFullYear();

   return date +"-"+ month +"-"+ year;
}
function filterList(id){
    var str = $(id).text();
    $("#dropdownBtn").text(str);
}
function showType(currentType){
  var str;
  if (currentType==1) {
    str = "<span class='label label-danger'>P&aacute;nico</span>";
  } else if (currentType==2) {
    str = "<span class='label label-warning'>Emergencia</span>";
  } else if (currentType==3) {
    str = "<span class='label label-info'>Ca&iacute;da Libre</span>";
  }
  return str;
}

// Order By

function orderEvents(){
  $("#orderByDatetime").parent().on("click",function(){
    orderByDatetime();
    $(this).children().css("color","#3da8e3");
  });
  $("#orderByDni").parent().on("click",function(){
    orderByDni();
    $(this).children().css("color","#3da8e3");
  });
  $("#orderByFirstName").parent().on("click",function(){
    orderByFirstName();
    $(this).children().css("color","#3da8e3");
  });
  $("#orderByLastName").parent().on("click",function(){
    orderByLastName();
    $(this).children().css("color","#3da8e3");
  });
  $("#orderByImei").parent().on("click",function(){
    orderByImei();
    $(this).children().css("color","#3da8e3");
  });
}
function orderByDatetime(){
    $("#tracksList").empty();
    $("#loader").show("fast");
    tracks.sort(function(a,b){
          if (a.datetime < b.datetime) return -1;
          if (b.datetime < a.datetime) return 1;
          return 0;
      });
    for (var i = 0; i < tracks.length; i++) {
       filltracksList(i);
    }
    $("#loader").hide("fast");
    $(".caret").css("color","black");
}
function orderByDni(){
    $("#tracksList").empty();
    $("#loader").show("fast");
    tracks.sort(function(a,b){
          if (a.dni < b.dni) return -1;
          if (b.dni < a.dni) return 1;
          return 0;
      });
    for (var i = 0; i < tracks.length; i++) {
       filltracksList(i);
    }
    $("#loader").hide("fast");
    $(".caret").css("color","black");
}
function orderByFirstName(){
    $("#tracksList").empty();
    $("#loader").show("fast");
    tracks.sort(function(a,b){
          if (a.firstName < b.firstName) return -1;
          if (b.firstName < a.firstName) return 1;
          return 0;
      });
    for (var i = 0; i < tracks.length; i++) {
       filltracksList(i);
    }
    $("#loader").hide("fast");
    $(".caret").css("color","black");
}
function orderByLastName(){
    $("#tracksList").empty();
    $("#loader").show("fast");
    tracks.sort(function(a,b){
          if (a.lastName < b.lastName) return -1;
          if (b.lastName < a.lastName) return 1;
          return 0;
      });
    for (var i = 0; i < tracks.length; i++) {
       filltracksList(i);
    }
    $("#loader").hide("fast");
    $(".caret").css("color","black");
}
function orderByImei(){
    $("#tracksList").empty();
    $("#loader").show("fast");
    tracks.sort(function(a,b){
          if (a.imei < b.imei) return -1;
          if (b.imei < a.imei) return 1;
          return 0;
      });
    for (var i = 0; i < tracks.length; i++) {
       filltracksList(i);
    }
    $("#loader").hide("fast");
    $(".caret").css("color","black");
}
