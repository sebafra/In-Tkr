var entityIdUrl = encodeURI(localStorage.trackersEntityId);
var tracks;
var jsonObject;
var pageActive;
var pages;
var clickParent;

$(document).ready(function() {
	initializeEvents();
});

function initializeEvents() {
	showtracks();
	orderEvents();
	$("#dropdownUl li").on("click", function() {
		filterList(this);
	});
	showCurrentTime();
	$("#entityId").html(
   localStorage.trackersLastName + " "
   + localStorage.trackersFirstName);
	$("#searchBtn").on('click', function() {
		showtracks();
	});
  $("#usersSearchBtn").on("click",function(){
    $("#searchContent").slideToggle("fast");
  });

	// (+) NUEVA PAGINACION
	$("#pgNext").click(
   function(e) {
    showNextPage();
  });
	$("#pgPrevious").click(
   function(e) {
    showPreviousPage();
  });
	// (-) NUEVA PAGINACION

}



function showtracks(page, orderBy, orderDirection) {
	// (+) NUEVA PAGINACION
	if(page == undefined || page == "" || page == "0")
		ACTIVE_PAGE = 1;
	// (-) NUEVA PAGINACION
	$("#tracksList").empty();
	$("#loader").show("fast");
	var tracksFile = SERVER_URL + "/api/track/getTracing?json="
			+ showTracksPrepareData(page, orderBy, orderDirection);
	$.getJSON(tracksFile,
			function(msg) {
				if (msg.status == "ok") {
					tracks = msg.data.tracks;
					for (var i = 0; i < msg.data.tracks.length; i++) {
						filltracksList(i);
						showDetailClick(i);
					}
					$("#loader").hide("fast");
					// showListCount();
					buildPagination(showTracksPrepareData(page, orderBy,orderDirection));
					//console.log("buildPagination");
				} else {
					showAlert("msg", "danger", msg.error.message);
				}
			});
}
function filltracksList(i) {
	$("#tracksList").append(
			"<tr id='user" + i + "'><td>" + parseDate(tracks[i].timestamp)
					+ "</td><td>" + tracks[i].finalUserDni + "</td><td>"
					+ tracks[i].finalUserFirstName + "</td><td>"
					+ tracks[i].finalUserLastName + "</td><td>"
					+ tracks[i].trackerImei + "</td><td>"
					+ showType(tracks[i].type) + "</td></tr>");
}
function showDetailClick(i){
	$("#tracksList #user"+i).on("click",function(){
		$('#trackDetail').modal("show");
		getAddress(i);
		setTimeout(function(){initialize(i);}, 500);
		$('#tracksList tr').removeClass();
		$('#user'+i).addClass("bg-primary");
	});
}
function showTracksPrepareData(page, orderBy, orderDirection) {
	jsonObject = {
		entityId : entityIdUrl,
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
		// if (dateFormatOK(dateStart)!==false) {
		jsonObject.dateStart = getDateMilliseconds(dateStart);
		// }
	}
	if (dateEnd !== undefined && dateEnd !== "") {
		// if (dateFormatOK(dateEnd)!==false) {
		jsonObject.dateEnd = getDateMilliseconds(dateEnd);
		// }
	}

	return getJsonString(jsonObject);
}

//Google Maps Query

function initialize(i) {
  var myLatlng = new google.maps.LatLng(tracks[i].latitude, tracks[i].longitude);
  var mapOptions = {
    zoom: 12,
    center: myLatlng
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var marker = new google.maps.Marker({
    position: myLatlng,
    animation: google.maps.Animation.DROP,
    map: map,
});
}
function getAddress(i){
	var file = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ tracks[i].latitude +","+ tracks[i].longitude +"&AIzaSyCLrK2IeysyliNYn655pINuagMXLqRNVjU&sensor=false";
	var data;
	$.getJSON(file, function(result){
		if(result.status=="OK"){
			data = result.results[0].formatted_address;
					$('#formatted_address').html(data);

	}
});
}

function filterList(id) {
	var str = $(id).text();
	$("#dropdownBtn").text(str);
	var name = $(id).attr("id");
	$("#dropdownBtn").attr("name", name);
}

var paginating = false;

//(+) NUEVA PAGINACION
var MAX_PAGES = 1;
var ACTIVE_PAGE = 1;

function showNextPage(){
	if(ACTIVE_PAGE >= MAX_PAGES) return;
	ACTIVE_PAGE++;
	showtracks(ACTIVE_PAGE, jsonObject.orderBy, jsonObject.orderDirection);
}

function showPreviousPage(){
	if(ACTIVE_PAGE <= 1) return;
	ACTIVE_PAGE--;
	showtracks(ACTIVE_PAGE, jsonObject.orderBy, jsonObject.orderDirection);
}

function buildPagination(jsonObjectUrl) {
	var maxPages = 1;

	var file = SERVER_URL + "/api/track/getTracingLength?json=" + jsonObjectUrl;

	$.getJSON(file, function(result) {
		if (result.status == "ok") {
			var tracingLength = result.data.tracingLength;
			showListCount(tracingLength);

			var temp = tracingLength / PAGE_RESULTS;
			MAX_PAGES = Math.round(temp);
			if(temp > MAX_PAGES) MAX_PAGES++;

			if (MAX_PAGES == 1) {
				$("#pgNext").parent().addClass("disabled");
				$("#pgPrevious").parent().addClass("disabled");
			} else {
				if (ACTIVE_PAGE <= 1) {
					$("#pgPrevious").parent().addClass("disabled");
					$("#pgNext").parent().removeClass("disabled");
				} else {
					$("#pgPrevious").parent().removeClass("disabled");
					if (MAX_PAGES == ACTIVE_PAGE)
						$("#pgNext").parent().addClass("disabled");
				}
			}
			$("#pgCurrent").text(ACTIVE_PAGE);

		} else {
			showAlert("msg", "danger", msg.error.message);
		}
		paginating = false;

	});
}
//(-) NUEVA PAGINACION




function showListCount(tracingLength) {
	$("#tracksCount").html(tracingLength);
	if (tracingLength != 1) {
		$("#tracksCountTxt").html("tracks disponibles");
	} else {
		$("#tracksCountTxt").html("track disponible");
	}
}

// Order By

function orderEvents() {
	var order;
	$(".orderBy").parent().on("click", function() {
		var orderByCurrent = $(this).attr("name");
		//alert(orderByCurrent);
		if (order !== "ASC" || order == "") {
			showtracks(undefined, orderByCurrent, "ASC");
			$(".caret").removeClass("inverse");
			$(this).children().addClass("inverse");
			order = "ASC";
			//console.log("First IF ASC");
		} else {
			if ($(this).text() !== clickParent) {
				showtracks(undefined, orderByCurrent, "ASC");
				order = "ASC";
				//console.log("Second IF ASC");
				$(".caret").removeClass("inverse");
				$(this).children().addClass("inverse");
			} else {
				order = "DESC";
				showtracks(undefined, orderByCurrent, "DESC");
				//console.log("Second IF DESC");
				$(this).children().removeClass("inverse");
			}
		}
		clickParent = $(this).text();
		$("#tracksListTable .caret").css("color", "black");
		$("#tracksListTable th").css("color", "black");
		$(this).children().css("color", "#3da8e3");
		$(this).css("color", "#3da8e3");
		//pageActive = 1;

		// (+) NUEVA PAGINACION
		ACTIVE_PAGE = 1;
		// (-) NUEVA PAGINACION

	});
}
//Google Maps Query

function initialize(i) {
  var myLatlng = new google.maps.LatLng(tracks[i].latitude, tracks[i].longitude);
  var mapOptions = {
    zoom: 12,
    center: myLatlng
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var marker = new google.maps.Marker({
    position: myLatlng,
    animation: google.maps.Animation.DROP,
    map: map,
});
}
function getAddress(i){
	var file = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ tracks[i].latitude +","+ tracks[i].longitude +"&AIzaSyCLrK2IeysyliNYn655pINuagMXLqRNVjU&sensor=false";
	var data;
	$.getJSON(file, function(result){
		if(result.status=="OK"){
			data = result.results[0].formatted_address;
			$('#formatted_address').html(data);
		}
	});
}

// Helpers

function parseDate(currentField) {
	var myNewDate = new Date(currentField);
	var date = myNewDate.getDate();
	var month = myNewDate.getMonth() + 1;
	var year = myNewDate.getFullYear();

	return date + "-" + month + "-" + year;
}
function showType(currentType) {
	var str;
	if (currentType == 1) {
		str = "<span class='label label-danger'>P&aacute;nico</span>";
	} else if (currentType == 2) {
		str = "<span class='label label-warning'>Emergencia</span>";
	} else if (currentType == 3) {
		str = "<span class='label label-info'>Ca&iacute;da Libre</span>";
	} else if (currentType == 4) {
		str = "<span class='label label-default'>Reporte</span>";
	}
	return str;
}
function showCurrentTime() {
	var currentTime = new Date();
	var date = currentTime.getDate();
	var month = currentTime.getMonth();
	var year = currentTime.getFullYear();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();

	if (minutes < 10)
		minutes = "0" + minutes;

	$("#currentTime").html(
			date + "-" + month + "-" + year + " " + hours + ":" + minutes + " "
					+ "hs");
}

function getJsonString(jsonObject) {
	// implement JSON.stringify serialization
	JSON.stringify = JSON.stringify || function(obj) {
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			// simple data type
			if (t == "string")
				obj = '"' + obj + '"';
			return String(obj);
		} else {
			// recurse array or object
			var n, v, json = [], arr = (obj && obj.constructor == Array);
			for (n in obj) {
				v = obj[n];
				t = typeof (v);
				if (t == "string")
					v = '"' + v + '"';
				else if (t == "object" && v !== null)
					v = JSON.stringify(v);
				json.push((arr ? "" : '"' + n + '":') + String(v));
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	};

	var tmpStr = JSON.stringify(jsonObject);

	return tmpStr;
}
function getDateMilliseconds(val) {

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

function dateFormatOK(val) {

	var v = val.split("-");

	try {

		day = parseInt(v[2]);

		if (isNaN(day))
			return false;

		month = parseInt(v[1]);

		if (isNaN(month))
			return false;

		year = parseInt(v[0]);

		if (isNaN(year))
			return false;

		if (day < 1)

			return false;

		if (month < 1 || month > 12)

			return false;

		if (month == 2)

			if (day > 28)

				return false; // TODO biciesto

		if (month == 4 || month == 6 || month == 9 || month == 11)

			if (day > 30)

				return false;

		if (month == 3 || month == 5 || month == 7 || month == 8 || month == 10
				|| month == 12)

			if (day > 31)

				return false;

		if (year < 1914 || year > 2000)

			return false;

	} catch (e) {

		return false;

	}

	return true;

}
