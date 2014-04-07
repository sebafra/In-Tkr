var entityIdUrl = encodeURI(localStorage.trackersEntityId);
var tracks;
var jsonObject;
var pageActive;
var pages;

$(document).ready(function () {
        initialize();
      });

function initialize () {
  showtracks();
  orderEvents();
  $("#dropdownUl li").on("click",function(){
    filterList(this);
  });
  showCurrentTime();
  $("#entityId").html(localStorage.trackersLastName+" "+localStorage.trackersFirstName);
    $("#searchBtn").on('click',function(){
    showtracks();
  });
}
function showtracks(page,orderBy,orderDirection){
 var tracksFile = SERVER_URL+"/api/track/getTracing?json="+ showTracksPrepareData(page,orderBy,orderDirection);
 $.getJSON(tracksFile, function(msg) {
  if(msg.status=="ok"){
    tracks=msg.data.tracks;
    $("#tracksList").empty();
    for (var i = 0; i < msg.data.tracks.length; i++) {
       filltracksList(i);
    }
    $("#loader").hide("fast");
    //showListCount();
    buildPagination(showTracksPrepareData(page,orderBy,orderDirection));
    console.log("buildPagination");
    } else {
      showAlert ("msg","danger",msg.error.message);
    }
  });
}
function filltracksList(i){
  $("#tracksList").append("<tr id='user"+i+"'><td>"+ parseDate(tracks[i].timestamp) +"</td><td>"+ tracks[i].finalUserDni  +"</td><td>"+ tracks[i].finalUserFirstName +"</td><td>"+ tracks[i].finalUserLastName +"</td><td>"+ tracks[i].trackerImei +"</td><td>"+ showType(tracks[i].type) +"</td></tr>");
}
function showTracksPrepareData(page,orderBy,orderDirection){
     jsonObject = {
      entityId:entityIdUrl,
      };

    var searchFilterOption = $("#dropdownBtn").attr("name");
    var searchInput = $.trim($("#searchInput").val());
    var trackType = $("#selectType option:selected").val();
    var dateStart = $("#dateStart").val();
    var dateEnd = $("#dateEnd").val();

    if (searchInput !== "") {
        jsonObject[searchFilterOption] = searchInput;
    }
    if (page !== undefined) {
      jsonObject.page = page;
    } else {
      jsonObject.page = 1;
    }
     if (orderBy !== undefined) {
      jsonObject.orderBy = orderBy;
    }
    if (orderDirection !== undefined) {
      jsonObject.orderDirection = orderDirection;
    }
    if (trackType !== undefined && trackType !== "") {
      jsonObject.type = trackType;
    }
    if (dateStart !== undefined && dateStart !== "") {
      //if (dateFormatOK(dateStart)!==false) {
        jsonObject.dateStart = getDateMilliseconds(dateStart);
      //}
    }
    if (dateEnd !== undefined && dateEnd !== "") {
      //if (dateFormatOK(dateEnd)!==false) {
        jsonObject.dateEnd = getDateMilliseconds(dateEnd);
      //}
    }

  return getJsonString(jsonObject);
}
function filterList(id){
    var str = $(id).text();
    $("#dropdownBtn").text(str);
    var name = $(id).attr("id");
    $("#dropdownBtn").attr("name",name);
}
function buildPagination(jsonObjectUrl){
	//var pages;
	var resultsPerPage = 50;
	var maxPages = 1;
		
	var file = SERVER_URL+"/api/track/getTracingLength?json="+ jsonObjectUrl;
	$.getJSON(file, function(result){
		if(result.status=="ok"){
			var tracingLength=result.data.tracingLength;
			showListCount(tracingLength);
			if (tracingLength > resultsPerPage) {
				var pagesTemp=tracingLength/resultsPerPage;
				maxPages = Math.round(tracingLength/resultsPerPage);
				//pages=(Math.floor(pagesTemp));
				pages=pagesTemp;
				$(".pagination").show();
			} else {
				pages=1;
				maxPages = 1;
				$(".pagination").hide();
			}
			if (pageActive !== undefined) {
				$("#pgCurrent").text(pageActive);
				$("#pgPrevious").parent().removeClass("disabled");
			} else {
				$("#pgCurrent").text(1);
				$("#pgPrevious").parent().addClass("disabled");
				pageActive = 1;
			}
			$("#pgNext").click(function(e){
				if(paginating) return;
				paginating = true;
				console.log("pageActive" + pageActive);
				if (pageActive < pages) {
					var nextPage = pageActive + 1;
					showtracks(nextPage,jsonObject.orderBy,jsonObject.orderDirection);
					pageActive = nextPage;
				}
				//e.preventDefault();
			});
			$("#pgPrevious").click(function(e){
				if(paginating) return;
				paginating = true;
				//alert(pageActive + "Previous");
				if (pageActive > 1){
					$("#pgPrevious").parent().removeClass("disabled");
					var previousPage = pageActive - 1;
					showtracks(previousPage,jsonObject.orderBy,jsonObject.orderDirection);
					pageActive = previousPage;
				} else {
					$("#pgPrevious").parent().addClass("disabled");
				}
				//e.preventDefault();
			});
			
			paginating = false;
			
			if(maxPages == 1){
				$("#pgNext").parent().addClass("disabled");
				$("#pgPrevious").parent().addClass("disabled");
			} else {
				if(pageActive <= 1){
					$("#pgPrevious").parent().addClass("disabled");
					$("#pgNext").parent().removeClass("disabled");
				} else {
					$("#pgPrevious").parent().removeClass("disabled");
					if(maxPages == pageActive)
						$("#pgNext").parent().addClass("disabled");
				}
			}
			
		} else {
			showAlert ("msg","danger",msg.error.message);
		}
		
	});
}

var paginating = false;

function showListCount(tracingLength){
  $("#tracksCount").html(tracingLength);
  if (tracingLength!=1) {
    $("#tracksCountTxt").html("tracks disponibles");
  } else {
    $("#tracksCountTxt").html("track disponible");
}
}

// Order By

function orderEvents(){
  var order;
  $(".orderBy").parent().on("click",function(){
    var orderByCurrent = $(this).attr("name");
    if (order !== "ASC" || order == "") {
      showtracks(undefined,orderByCurrent,"ASC");
      $("#tracksList .caret").removeClass("inverse");
      order = "ASC";
    } else {
      showtracks(undefined,orderByCurrent,"DESC");
      order = "DESC";
      $(this).children().addClass("inverse");
    }
    $("#tracksList .caret").css("color","black");
    $(this).children().css("color","#3da8e3");
    pageActive = 1;
  });
}

// Helpers

function parseDate(currentField){
  var myNewDate = new Date(currentField);
  var date = myNewDate.getDate();
  var month = myNewDate.getMonth()+1;
  var year = myNewDate.getFullYear();

   return date +"-"+ month +"-"+ year;
}
function showType(currentType){
  var str;
  if (currentType==1) {
    str = "<span class='label label-danger'>P&aacute;nico</span>";
  } else if (currentType==2) {
    str = "<span class='label label-warning'>Emergencia</span>";
  } else if (currentType==3) {
    str = "<span class='label label-info'>Ca&iacute;da Libre</span>";
  } else if (currentType==4) {
    str = "<span class='label label-default'>Reporte</span>";
  }
  return str;
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

function getJsonString(jsonObject){
  // implement JSON.stringify serialization
  JSON.stringify = JSON.stringify || function (obj) {
      var t = typeof (obj);
      if (t != "object" || obj === null) {
          // simple data type
          if (t == "string") obj = '"'+obj+'"';
          return String(obj);
      }
      else {
          // recurse array or object
          var n, v, json = [], arr = (obj && obj.constructor == Array);
          for (n in obj) {
              v = obj[n]; t = typeof(v);
              if (t == "string") v = '"'+v+'"';
              else if (t == "object" && v !== null) v = JSON.stringify(v);
              json.push((arr ? "" : '"' + n + '":') + String(v));
          }
          return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
      }
  };

  var tmpStr = JSON.stringify(jsonObject);

  return tmpStr;
}
function getDateMilliseconds(val){

var v = val.split("-");

day = parseInt(v[2]);

month = parseInt(v[1]);

year = parseInt(v[0]);

var d = new Date();

d.setDate(day);

d.setMonth(month - 1);

d.setFullYear(year);

d.setHours(0);

d.setMinutes(0);

d.setSeconds(0);

d.setMilliseconds(0);

return d.getTime();

}



function dateFormatOK(val){

var v = val.split("-");

try{

day = parseInt(v[2]);

if(isNaN(day)) return false;

month = parseInt(v[1]);

if(isNaN(month)) return false;



year = parseInt(v[0]);

if(isNaN(year)) return false;

if(day < 1)

return false;

if(month < 1 || month > 12)

return false;

if(month == 2)

if(day > 28 )

return false; // TODO biciesto



if(month == 4 || month == 6 || month == 9 || month == 11 )

if(day > 30 )

return false;



if(month == 3 || month == 5 || month == 7 || month == 8  || month == 10  || month == 12 )

if(day > 31 )

return false;



if(year < 1914 || year > 2000)

return false;

}catch(e){

return false;

}

return true;

}


