var mapFlag = true;
var entityIdUrl = encodeURI(localStorage.trackersEntityId);
var oldItems;
var oldItem;
var alertItems;
var alertItem;
var lastAlertLatitude;
var lastAlertLongitude;
var infoWindow = null;
var alertCity = "";
var alertAddress = "";
var plus = 0;
var trackersWithoutReport;
var trackerRouteCoordinates = new Array();
var lastIndexUsed;

$(document).ready(function() {
	if (OBTAIN_URL_DINAMICALLY)
		obtainServerUrl();
	showTopAlerts();
	showTrackersWithoutReport();
	showReportSummary();
	showLastRefresh();
	showMap();
	refresh();
	initializeEvents();
});

function initializeEvents() {
	$("#dateFilterBtn").on("click", function() {
		$("#filterContainer").slideToggle();
	});
	$("#filterBtn").on("click", function() {
		getTrackerRoute(lastIndexUsed);
	});
	$('#trackerRoute').on('hidden.bs.modal', function (e) {
		resetRouteModal();
});
}

function showTrackersWithoutReport() {
	$("#noTrackersMessage").remove();
	var trackersFile = SERVER_URL
			+ "/api/tracker/getUnreported?json={entityId%3A" + entityIdUrl
			+ "}";
	$
			.getJSON(
					trackersFile,
					function(msg) {
						if (msg.status == "ok") {
							if (msg.data.trackers.length !== 0) {
								$(".bodyTop10Trackers table").css("display","");
								trackersWithoutReport = msg.data.trackers;
								$("#trackersWithoutReport").empty();
								for (var i = 0, len = msg.data.trackers.length; i < len; i++) {
									$("#trackersWithoutReport")
											.append(
													"<tr id='trackerRow"+ msg.data.trackers[i].id
															+ "' style='cursor:pointer'><td>"
															+ (i + 1)
															+ "</td><td>"
															+ parseTime(msg.data.trackers[i].trackTimestamp)
															+ "</td><td>"
															+ msg.data.trackers[i].firstName
															+ "</td><td>"
															+ msg.data.trackers[i].lastName
															+ "</td></tr>");
									trackersWithoutReportClickEvent(msg.data.trackers[i].id);
								}
							} else {
								$(".bodyTop10Trackers table").css("display","none");
								$(".bodyTop10Trackers")
										.append(
												"<div id='noTrackersMessage' style='color:#555' class='well well-sm'><span class='fa fa-exclamation'></span> No hay datos disponibles</div>");
							}
							$("#operatorsLoader").remove();
						}
					});
}
function trackersWithoutReportClickEvent(trackerId) {
	$("#trackerRow" + trackerId).on("click", function() {
		$("#trackersWithoutReport > tr").removeClass("bg-info");
		$(this).addClass("bg-info");
		buildMapTrackerRoute(trackerId);
	});
}

function buildMapTrackerRoute(trackerId, dateFrom, dateTo) {
	$("#trackerRoute").modal("show");
	getTrackerRoute(trackerId, dateFrom, dateTo);
}

function getTrackerRoute(trackerId) {
	// console.log("TrackerId:"+ alertItems[i].trackerId);
	console.log(showTracksPrepareData(trackerId));

	var file = SERVER_URL + "/api/track/getRoute?json="
			+ showTracksPrepareData(trackerId);
	// var file = "json/tracks.json";
	$.getJSON(file, function(result) {
		if (result.status == "ok") {
			if (result.data.tracks.length == 0) {
				showAlert("emptyRoute", "danger", "No hay resultados");
			} else {
			trackerRouteCoordinates = new Array();
			for (var n = 0; n < result.data.tracks.length; n++) {
				trackerRouteCoordinates[n] = new google.maps.LatLng(
						Number(result.data.tracks[n].latitude),
						Number(result.data.tracks[n].longitude));
			}
			googleMapsQuery();
			lastIndexUsed = trackerId;
		}
	}
	});
}

function showTracksPrepareData(trackerId) {
	// if (i == undefined)
	// 	i = 0;

	jsonObject = {
		trackerId : trackerId
	};

	var dateStart = $("#dateStart").val();
	var dateEnd = $("#dateEnd").val();

	if (dateStart !== undefined && dateStart !== "") {
		jsonObject.dateStart = getDateMilliseconds(dateStart);
	}
	if (dateEnd !== undefined && dateEnd !== "") {
		jsonObject.dateEnd = getDateMilliseconds(dateEnd);
	}
	return getJsonString(jsonObject);
}

// Google Maps Query

function googleMapsQuery() {

	var lastTrack = 0;
	//var lastTrack = trackerRouteCoordinates.length - 1;
	//console.log("lastTrack:"+lastTrack);

	var mapOptions = {
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map-canvas-route'),
			mapOptions);

	var trackerRoute = new google.maps.Polyline({
		path : trackerRouteCoordinates,
		geodesic : true,
		strokeColor : '#FF0000',
		strokeOpacity : 1.0,
		strokeWeight : 2
	});
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < trackerRouteCoordinates.length; i++) {
		bounds.extend(trackerRouteCoordinates[i]);
	}
	var marker = new google.maps.Marker({
		position : trackerRouteCoordinates[lastTrack],
		animation : google.maps.Animation.DROP,
	});
	setTimeout(function() {
		google.maps.event.trigger(map, 'resize');
		// map.setCenter(trackerRouteCoordinates[lastTrack]);
		map.fitBounds(bounds);
		marker.setMap(map);
	}, 200);
	trackerRoute.setMap(map);
}

function showReportSummary() {
	var file = SERVER_URL + "/api/tracker/getStatusSummary?json={entityId%3A"
			+ entityIdUrl + "}";
	$.getJSON(file, function(result) {
		if (result.status == "ok") {
			$("#totalReporting").html(result.data.reporting);
			$("#totalWithoutReporting").html(result.data.withoutReport);
		} else {
			// alert("no ok");
		}
	});
}
function showTopAlerts() {
	$("#noDataMessage").remove();
	var alertsFile = SERVER_URL + "/api/track/getLastAlerts?json={entityId%3A"
			+ entityIdUrl + "}";
			$.getJSON(
					alertsFile,
					function(msg) {
						if (msg.status == "ok") {
							if (msg.data.tracks.length !== 0) {
								$(".bodyTop10Alerts table").css("display","");
								var myLatlng;
								alertItems = msg.data.tracks;
								alertItems.sort(function(a, b) {
									if (a.timestamp < b.timestamp)
										return -1;
									if (b.timestamp < a.timestamp)
										return 1;
									return 0;
								});
								alertItems.reverse();
								// $("#lastAlerts").empty();
								for (var i = 0, len = msg.data.tracks.length; i < len; i++) {
									alertItem = msg.data.tracks[i];
									// Listado de ultimas alertas
									$("#lastAlerts")
											.append(
													"<tr id='alertRow"
															+ msg.data.tracks[i].id
															+ "' style='cursor:pointer'><td>"
															+ (i + 1)
															+ "</td><td>"
															+ parseDate(msg.data.tracks[i].timestamp)
															+ "</td><td>"
															+ msg.data.tracks[i].finalUserFirstName
															+ " "
															+ msg.data.tracks[i].finalUserLastName
															+ "</td><td>"
															+ showAlertType(msg.data.tracks[i].type)
															+ "</td></tr>");

									// Eventos en filas del listado de ultimas
									// alertas
									clickRowLastAlerts(msg.data.tracks[i].id,msg.data.tracks[i].trackerId, alertItem.latitude,
											alertItem.longitude,
											alertItem.finalUserFirstName,
											alertItem.finalUserLastName,
											alertItem.trackerAni,
											alertItem.finalUserPhones,
											alertItem.finalUserPictureUrl);
								}
								//clickRowLastAlerts(msg.data.tracks.id,alertItem);
								$("#operatorsLoader").remove();
								$("#lastAlerts > tr:first-child").addClass(
										"bg-info");
								// Ex-initialShowMap
								if (mapFlag === true) {
									showMap(msg.data.tracks[0].trackerId,
											msg.data.tracks[0].latitude,
											msg.data.tracks[0].longitude,
											msg.data.tracks[0].finalUserFirstName,
											msg.data.tracks[0].finalUserLastName,
											msg.data.tracks[0].trackerAni,
											msg.data.tracks[0].finalUserPhones,
											msg.data.tracks[0].finalUserPictureUrl);
								};
								// initialShowMap(msg.data.tracks[0].id,
								// 			msg.data.tracks[0].trackerId,
								// 			msg.data.tracks[0].latitude,
								// 			msg.data.tracks[0].longitude,
								// 			msg.data.tracks[0].finalUserFirstName,
								// 			msg.data.tracks[0].finalUserLastName,
								// 			msg.data.tracks[0].trackerAni,
								// 			msg.data.tracks[0].finalUserPhones,
								// 			msg.data.tracks[0].finalUserPictureUrl);
								oldItems = msg.data.tracks;
							} else {
								$("#map-canvas").empty();
								$("#map-canvas").html("<div style='width:100%;text-align:center;margin:0 auto;padding-top:100px'><span class='fa fa-exclamation'></span> No hay datos disponibles</div>");
								$(".bodyTop10Alerts table").css("display","none");
								$(".bodyTop10Alerts")
										.append(
												"<div id='noDataMessage' style='color:#555' class='well well-sm'><span class='fa fa-exclamation'></span> No hay datos disponibles</div>");
							}
						}
					});
}

function reloadTopAlerts() {
	$("#noDataMessage").remove();
	var alertsFile = SERVER_URL + "/api/track/getLastAlerts?json={entityId%3A" + entityIdUrl + "}";
	$.getJSON(alertsFile,
		function(msg) {
						if (msg.status == "ok") {
							if (msg.data.tracks.length !== 0) {
								$(".bodyTop10Alerts table").css("display","");
								var myLatlng;
								for (var i = 0, len = msg.data.tracks.length; i < len; i++) {
									alertItem = msg.data.tracks[i];
									var exists = false;
									if (oldItems !== undefined) {
									//if (reloadFlag == true) {
										for (var n = 0, leng = oldItems.length; n < leng; n++) {
											// console.log(alertItem.id +" - "+
											// oldItems[n].id);
											// console.log(n);
											if (alertItem.id == oldItems[n].id) {
												exists = true;
											}
										}
										if (exists == false) {
											console.log("Entro en falso");
											$("#alertRow" + alertItem.id).addClass("bg-danger");
											$("#lastAlerts")
													.prepend(
															"<tr id='alertRow"+ alertItem.id
															+ "' style='cursor:pointer'><td>"
															+ i	+ "</td><td>"
															+ parseDate(msg.data.tracks[i].timestamp)
															+ "</td><td>"
															+ msg.data.tracks[i].finalUserFirstName
															+ " "
															+ msg.data.tracks[i].finalUserLastName
															+ "</td><td>"
															+ showAlertType(msg.data.tracks[i].type)
															+ "</td></tr>");
											$("#alertRow" + alertItem.id).addClass(
													"bg-danger");
											clickRowLastAlerts(
													alertItem.id,
													alertItem.trackerId,
													alertItem.latitude,
													alertItem.longitude,
													alertItem.finalUserFirstName,
													alertItem.finalUserLastName,
													alertItem.trackerAni,
													alertItem.finalUserPhones,
													alertItem.finalUserPictureUrl);
											showMap(
													alertItem.trackerId,
                          alertItem.latitude,
													alertItem.longitude,
													alertItem.finalUserFirstName,
													alertItem.finalUserLastName,
													alertItem.trackerAni,
													alertItem.finalUserPhones,
													alertItem.finalUserPictureUrl);
											deleteOlderAlert();
											orderAlertPosition();
										}
									} else {
										$("#alertRow" + alertItem.id).addClass("bg-danger");
											$("#lastAlerts")
													.prepend(
															"<tr id='alertRow"+ alertItem.id
															+ "' style='cursor:pointer'><td>"
															+ (i+1) +"</td><td>"
															+ parseDate(msg.data.tracks[i].timestamp)
															+ "</td><td>"
															+ msg.data.tracks[i].finalUserFirstName
															+ " "
															+ msg.data.tracks[i].finalUserLastName
															+ "</td><td>"
															+ showAlertType(msg.data.tracks[i].type)
															+ "</td></tr>");
											$("#alertRow" + alertItem.id).addClass(
													"bg-danger");
											clickRowLastAlerts(
													alertItem.id,
													alertItem.trackerId,
													alertItem.latitude,
													alertItem.longitude,
													alertItem.finalUserFirstName,
													alertItem.finalUserLastName,
													alertItem.trackerAni,
													alertItem.finalUserPhones,
													alertItem.finalUserPictureUrl);
											showMap(
													alertItem.trackerId,
                          alertItem.latitude,
													alertItem.longitude,
													alertItem.finalUserFirstName,
													alertItem.finalUserLastName,
													alertItem.trackerAni,
													alertItem.finalUserPhones,
													alertItem.finalUserPictureUrl);
											orderAlertPosition();
									}
								}
								oldItems = msg.data.tracks;
							} else {
								$("#map-canvas").empty();
								$("#map-canvas").html("<div style='width:100%;text-align:center;margin:0 auto;padding-top:100px'><span class='fa fa-exclamation'></span> No hay datos disponibles</div>");
								$(".bodyTop10Alerts table").css("display","none");
								$(".bodyTop10Alerts")
										.append(
												"<div id='noDataMessage' style='color:#555' class='well well-sm'><span class='fa fa-exclamation'></span> No hay datos disponibles</div>");
							}
						}
					});
}

// Evento Click en filas del panel ultimas alertas reportadas
function clickRowLastAlerts(trackId,trackerId,alertRowLat,alertRowLong,finalUserFirstName,finalUserLastName,trackerAni,finalUserPhones,finalUserPictureUrl) {
	$("#alertRow" + trackId).on(
			"click",
			function() {
				//console.log("working");
				showMap(trackerId,alertRowLat, alertRowLong, finalUserFirstName,
						finalUserLastName, trackerAni, finalUserPhones,
						finalUserPictureUrl);
				$("#lastAlerts > tr").removeClass("bg-info");
				$(this).addClass("bg-info");
				$(this).removeClass("bg-danger");
			});
}

var currentMapMyLatlng, currentMapFinalUserFirstName, currentMapFinalUserLastName, currentMapTrackerAni, currentMapFinalUserPhones, currentMapFinalUserPictureUrl;

function showMap(trackerId,alertLat,alertLong,finalUserFirstName,finalUserLastName,trackerAni, finalUserPhones, finalUserPictureUrl) {

	myLatlng = new google.maps.LatLng(alertLat, alertLong);

	currentMapTrackerId = trackerId;
	currentMapMyLatlng = myLatlng;
	currentMapFinalUserFirstName = finalUserFirstName;
	currentMapFinalUserLastName = finalUserLastName;
	currentMapTrackerAni = trackerAni;
	currentMapFinalUserPhones = finalUserPhones;
	currentMapFinalUserPictureUrl = finalUserPictureUrl;

	getAddressNew(alertLat, alertLong);

	// google.setOnLoadCallback(initialize);
}

/*
 * function
 * showMap(alertLat,alertLong,finalUserFirstName,finalUserLastName,trackerAni,finalUserPhones,finalUserPictureUrl){
 * myLatlng = new google.maps.LatLng(alertLat,alertLong);
 * getAddress(alertLat,alertLong);
 * initialize(myLatlng,finalUserFirstName,finalUserLastName,trackerAni,finalUserPhones,finalUserPictureUrl);
 * //google.setOnLoadCallback(initialize); }
 */
// function initialShowMap() {
// 	if (mapFlag === true) {
// 			showMap(alertItems[lastAlert].id,
// 				alertItems[lastAlert].trackerId,
// 				alertItems[lastAlert].latitude,
// 				alertItems[lastAlert].longitude,
// 				alertItems[lastAlert].finalUserFirstName,
// 				alertItems[lastAlert].finalUserLastName,
// 				alertItems[lastAlert].trackerAni,
// 				alertItems[lastAlert].finalUserPhones,
// 				alertItems[lastAlert].finalUserPictureUrl);
// 	}
// }



function getAlertCityName(result) {
	var fa = result.results[0].formatted_address;
	var fas = fa.split(",");
	if (fas.length >= 3) {
		var stringA = fas[fas.length - 3];
		var stringB = fas[fas.length - 2];
		var length = 13;
		var trimmedStringA = stringA.length > length ? stringA.substring(0,
				length - 3)
				+ "..." : stringA.substring(0, length);
		var trimmedStringB = stringB.length > length ? stringB.substring(0,
				length - 3)
				+ "..." : stringB.substring(0, length);

		return trimmedStringA + "," + trimmedStringB;
	} else {
		var stringA = fas[0];
		var stringB = fas[1];
		var length = 13;
		var trimmedStringA = stringA.length > length ? stringA.substring(0,
				length - 3)
				+ "..." : stringA.substring(0, length);
		var trimmedStringB = stringB.length > length ? stringB.substring(0,
				length - 3)
				+ "..." : stringB.substring(0, length);
		return trimmedStringA + "," + trimmedStringB;
	}
}
function getAlertAddressName(result) {
	var stringA = result.results[0].address_components[1].long_name;
	var stringB = result.results[0].address_components[0].long_name;

	return stringA + " " + stringB;
}

function getAddressNew(latitude, longitude) {
	var file = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
			+ latitude + "," + longitude
			+ "&AIzaSyCLrK2IeysyliNYn655pINuagMXLqRNVjU&sensor=false";
	$.getJSON(file, function(result) {
		alertCity = "";
		alertAddress = "";
		if (result.status == "OK") {
			alertCity = getAlertCityName(result);
			alertAddress = getAlertAddressName(result);
		}
		initialize(currentMapTrackerId, currentMapMyLatlng, currentMapFinalUserFirstName,
				currentMapFinalUserLastName, currentMapTrackerAni,
				currentMapFinalUserPhones, currentMapFinalUserPictureUrl);
	});
}

function getAddress(latitude, longitude) {
	var file = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
			+ latitude + "," + longitude
			+ "&AIzaSyCLrK2IeysyliNYn655pINuagMXLqRNVjU&sensor=false";
	$.getJSON(file, function(result) {
		if (result.status == "OK") {
			var stringA = result.results[1].address_components[0].long_name;
			var stringB = result.results[1].address_components[1].long_name;
			var length = 10
			var trimmedString1 = stringA.length > length ? stringA.substring(0,
					length - 3)
					+ "..." : stringA.substring(0, length);
			var trimmedString2 = stringB.length > length ? stringB.substring(0,
					length - 3)
					+ "..." : stringB.substring(0, length);
			alertCity = trimmedString1 + " ," + trimmedString2;
		} else {
			// alert("Error obteniendo coordenadas: "+result.results.error);
		}
	});
}
// Google Maps Query main map - START
function initialize(finalUserTrackerId, mapLatyLong, finalUserFirstName, finalUserLastName,
		trackerAni, finalUserPhones, finalUserPictureUrl) {

	if (finalUserTrackerId !== undefined) {
		var mapOptions = {
			center : mapLatyLong,
			zoom : 12
		};
	} else {
		var mapOptions = {
			center : new google.maps.LatLng(-32.945712, -64.698066),
			zoom : 3
		};
	}
	;

	// var mapOptions = {
	// 		center : mapLatyLong,
	// 		zoom : 12
	// 	};

	var map = new google.maps.Map(document.getElementById("map-canvas"),
			mapOptions);
	var contentString = '<div class="container-fluid">'
			+ '<div class="col-xs-1 pull-left" style="padding-left:0; text-algin:"left"><span id="infoWindowRouteBtn" class="fa fa-code-fork text-muted" style="font-size:1.5em; margin-bottom:1.5em"></span><span id="infoWindowZoomBtn" class="fa fa-search-plus text-muted" style="font-size:1.5em"></span></div>'
			+ '<div class="col-xs-1 pull-left" style="padding-left:0">'
			+ '<img src="'
			+ SERVER_URL
			+ finalUserPictureUrl
			+ '"onerror="this.onerror=null;this.src=\''
			+ IMG_URL
			+ '/user_avatar.png\'" class="img-circle alertFace";">'
			+ '</div>'
			+ '<div class="col-xs-2"></div>'
			+ '<div class="col-xs-8">'
			+ '<span style="font-weight:bold">'
			+ finalUserFirstName
			+ ' '
			+ finalUserLastName
			+ '</span></br>'
			+ '<span><span class="fa fa-phone"></span> '
			+ (finalUserPhones == undefined ? "" : finalUserPhones)
			+ '</span></br>'
			+ '<span style="font-size:.9em;width:100%"><span class="fa fa-road"></span> '
			+ alertAddress
			+ '</span></br>'
			+ '<span class="label label-primary" id="alertCityName">'
			+ alertCity + '</span>' + '</div>' + '</div>';

	var infowindow = new google.maps.InfoWindow({
		content : contentString,
		maxWidth : 300
	});
	google.maps.event.addListener(infowindow, 'domready', function() {
		$("#infoWindowRouteBtn").on("click", function(e) {
			buildMapTrackerRoute(finalUserTrackerId);
		});
		$("#infoWindowZoomBtn").on("click", function(e) {
			map.setZoom(16);
			map.setCenter(marker.getPosition());
		});
	});
	var marker = new google.maps.Marker({
		position : myLatlng,
		animation : google.maps.Animation.DROP,
	});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});
	// To add the marker to the map, call setMap();
	marker.setMap(map);
	if (finalUserTrackerId !== undefined) {
		setTimeout(function() {
			infowindow.open(map, marker);
		}, 1000);
	}
}

// Google Maps Query main map - END

function refresh() {
	setTimeout(function() {
		mapFlag = false;
		reloadTopAlerts();
		showTrackersWithoutReport();
		showReportSummary();
		showLastRefresh();
		refresh();

	}, 30000); // Cada 30 segundos refresh
}
function showLastRefresh() {
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();

	if (minutes < 10)
		minutes = "0" + minutes;

	$("#showLastRefresh").html(hours + ":" + minutes + " " + "hs");
}
function orderAlertPosition() {
/*	$("#lastAlerts tr").each(
			function(index) {
				$("#lastAlerts tr:nth-child(" + index + ") td:first-child")
						.html(index);
			});*/
	
	var rowCount = $('#lastAlerts tr').length;
	for(var idx = 0;idx < rowCount + 1 ;idx++)
		$("#lastAlerts tr:nth-child(" + idx + ") td:first-child").html(idx );
	
}
function deleteOlderAlert() {
	// var size = $("#lastAlerts tr").length();
	$("#lastAlerts tr").each(function(index) {
		if (index > 19) {
			$("#lastAlerts tr:nth-child(" + index + ")").remove();
		}
	});
}
function resetRouteModal(){
	$("#map-canvas-route").empty();
	$("#filterContainer").hide();
	$('#dateFilterForm').each (function(){
  this.reset();
});

}

function showAlertType(alertType) {
	if (alertType == 1) {
		return "<span class='label label-danger'>P&aacute;nico</span>";
	} else if (alertType == 2) {
		return "<span class='label label-warning'>Emergencia</span>";
	} else if (alertType == 3) {
		return "<span class='label label-info'>Ca&iacute;da Libre</span>";
	}
}
function parseDate(currentField) {
	var myNewDate = new Date(currentField);
	var date = myNewDate.getDate();
	var month = myNewDate.getMonth() + 1;
	var hours = myNewDate.getHours();
	var minutes = myNewDate.getMinutes();

	if (minutes < 10)
		minutes = "0" + minutes;

	return date + "-" + month + " " + hours + ":" + minutes;
}
function parseTime(trackTimestamp) {
	var myNewTime = new Date(trackTimestamp);
	var hours = myNewTime.getHours();
	var minutes = myNewTime.getMinutes();

	if (minutes < 10)
		minutes = "0" + minutes;

	return hours + ":" + minutes;
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
