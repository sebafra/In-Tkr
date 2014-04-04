var entityIdUrl = encodeURI(localStorage.trackersEntityId);
var trackers;

$(document).ready(function () {
        initialize();
      });

function initialize () {
  showtrackers(1);
  $("#table2csv").on("click",function(){
    $('#trackersListTable').table2CSV({
       delivery: 'download'
     });
  });
  orderEvents();
  $("#dropdownUl li").on("click",function(){
    filterList(this);
  });
  buildPagination();
  showCurrentTime();
  $("#entityId").html(localStorage.trackersLastName+" "+localStorage.trackersFirstName);
}
function showtrackers(page){
 var trackersFile = SERVER_URL+"/api/tracker/getPark?json={entityId:%22"+ entityIdUrl +"%22,page:%22"+ page +"%22}";
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
    $(".pagination li:first-child").addClass("active");
    } else {
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
function getPaginationLength(){
  // var file = SERVER_URL+"/api/tracker/getParkLength?json={entityId:%22"+ entityIdUrl +"%22}";
  // $.getJSON(file, function(result){
  //   if(result.status=="ok"){
  //     var parkLength=result.data.number;
  //     var pagesTemp=parkLength/50;
  //     pages=(Math.floor(pagesTemp))+1;

      //return pages;
      return 10;
  //}});
}
function buildPagination(){
  //n = getPaginationLength();
  var n = getPaginationLength();
  for (var i = 0; i < n; i++) {
    $(".pagination").append("<li id='page"+(i+1)+"'><a href='#'>"+(i+1)+"</a></li>");
    $("#page"+(i+1)).on("click",function(){
      showtrackers(i+1);
      $(".pagination li").removeClass("active");
      $(this).addClass("active");
    });
    //console.log("works "+(i+1));
  }
}
function showCurrentTime(){
  var currentTime = new Date();
  var date = currentTime.getDate();
  var month = currentTime.getMonth();
  var year = currentTime.getFullYear();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();

  if (minutes < 10)
  minutes = "0" + minutes;

  $("#currentTime").html(date+ "-" +month+ "-" +year+ " " +hours + ":" + minutes + " " + "hs");
}
