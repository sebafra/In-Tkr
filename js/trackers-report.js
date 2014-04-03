var entityIdUrl = encodeURI(localStorage.trackersEntityId);
var trackers;

$(document).ready(function () {
        initialize();
      });

function initialize () {
  showtrackers();
  $("#table2csv").on("click",function(){
    $('#trackersListTable').table2CSV({
       delivery: 'download'
     });
  });
  orderEvents();
  $("#dropdownUl li").on("click",function(){
    filterList(this);
  });
}
function showtrackers(){
 var trackersFile = SERVER_URL+"/api/tracker/getPark?json={entityId:%22"+ entityIdUrl +"%22}";
 $.getJSON(trackersFile, function(msg) {
  if(msg.status=="ok"){
    trackers=msg.data.trackers;
    trackers.sort(function(a, b){
          if (a.lastName < b.lastName) return -1;
          if (b.lastName < a.lastName) return 1;
          return 0;
      });
    $("#trackersList").empty();
    for (var i = 0; i < msg.data.trackers.length; i++) {
       filltrackersList(i);
    }
    $("#trackersListLoader").hide("fast");
    showListCount();
    } else {
      alert("Hola");
      showAlert ("msg","danger",msg.error.message);
    }
  });
}
function filltrackersList(i){
  $("#trackersList").append("<tr id='user"+i+"'><td>"+ parseDate(trackers[i].datetime) +"</td><td>"+ trackers[i].finalUserDni  +"</td><td>"+ trackers[i].finalUserFirstName +"</td><td>"+ trackers[i].finalUserLastName +"</td><td>"+ trackers[i].imei +"</td></tr>");
}
function showListCount(){
  $("#trackersCount").html(trackers.length);
  if (trackers.length!=1) {
    $("#trackersCountTxt").html("usuarios registrados");
  } else {
    $("#trackersCountTxt").html("usuario registrado");
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
    $("#trackersList").empty();
    $("#trackersListLoader").show("fast");
    trackers.sort(function(a,b){
          if (a.datetime < b.datetime) return -1;
          if (b.datetime < a.datetime) return 1;
          return 0;
      });
    for (var i = 0; i < trackers.length; i++) {
       filltrackersList(i);
    }
    $("#trackersListLoader").hide("fast");
    $(".caret").css("color","black");
}
function orderByDni(){
    $("#trackersList").empty();
    $("#trackersListLoader").show("fast");
    trackers.sort(function(a,b){
          if (a.dni < b.dni) return -1;
          if (b.dni < a.dni) return 1;
          return 0;
      });
    for (var i = 0; i < trackers.length; i++) {
       filltrackersList(i);
    }
    $("#trackersListLoader").hide("fast");
    $(".caret").css("color","black");
}
function orderByFirstName(){
    $("#trackersList").empty();
    $("#trackersListLoader").show("fast");
    trackers.sort(function(a,b){
          if (a.firstName < b.firstName) return -1;
          if (b.firstName < a.firstName) return 1;
          return 0;
      });
    for (var i = 0; i < trackers.length; i++) {
       filltrackersList(i);
    }
    $("#trackersListLoader").hide("fast");
    $(".caret").css("color","black");
}
function orderByLastName(){
    $("#trackersList").empty();
    $("#trackersListLoader").show("fast");
    trackers.sort(function(a,b){
          if (a.lastName < b.lastName) return -1;
          if (b.lastName < a.lastName) return 1;
          return 0;
      });
    for (var i = 0; i < trackers.length; i++) {
       filltrackersList(i);
    }
    $("#trackersListLoader").hide("fast");
    $(".caret").css("color","black");
}
function orderByImei(){
    $("#trackersList").empty();
    $("#trackersListLoader").show("fast");
    trackers.sort(function(a,b){
          if (a.imei < b.imei) return -1;
          if (b.imei < a.imei) return 1;
          return 0;
      });
    for (var i = 0; i < trackers.length; i++) {
       filltrackersList(i);
    }
    $("#trackersListLoader").hide("fast");
    $(".caret").css("color","black");
}
