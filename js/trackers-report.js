var entityIdUrl = encodeURI(localStorage.trackersEntityId);
var trackers;
var jsonObject;
var pageActive;
var clickParent;

$(document).ready(function() {
	initialize();
});

function initialize() {
	showtrackers();
	orderEvents();
	$("#dropdownUl li").on("click", function() {
		filterList(this);
	});
	showCurrentTime();
	$("#entityId").html(
			localStorage.trackersLastName + " "
					+ localStorage.trackersFirstName);
	$("#searchBtn").on('click', function() {
		showtrackers();
	});
	$("#usersSearchBtn").on("click", function() {
		$("#searchContent").slideToggle("fast");
	});

	// (+) NUEVA PAGINACION
	$("#pgNext").click(function(e) {
		showNextPage();
	});
	$("#pgPrevious").click(function(e) {
		showPreviousPage();
	});
	// (-) NUEVA PAGINACION

}
function showtrackers(page, orderBy, orderDirection) {

	// (+) NUEVA PAGINACION
	if (page == undefined || page == "" || page == "0")
		ACTIVE_PAGE = 1;
	// (-) NUEVA PAGINACION

	var trackersFile = SERVER_URL + "/api/tracker/getPark?json="
			+ showTrackersPrepareData(page, orderBy, orderDirection);
	$.getJSON(trackersFile, function(msg) {
		if (msg.status == "ok") {
			trackers = msg.data.trackers;
			$("#trackersList").empty();
			for (var i = 0; i < msg.data.trackers.length; i++) {
				filltrackersList(i);
			}
			$("#trackersListLoader").hide("fast");
			showListCount();
			buildPagination(showTrackersPrepareData(page, orderBy,
					orderDirection));
		} else {
			showAlert("msg", "danger", msg.error.message);
		}
	});
}
function filltrackersList(i) {
	$("#trackersList").append(
			"<tr id='user"
					+ i
					+ "'><td>"
					+ parseDate(trackers[i].datetime)
					+ "</td><td>"
					+ (trackers[i].finalUserDni == undefined ? ""
							: trackers[i].finalUserDni)
					+ "</td><td>"
					+ (trackers[i].finalUserFirstName == undefined ? ""
							: trackers[i].finalUserFirstName)
					+ "</td><td>"
					+ (trackers[i].finalUserLastName == undefined ? ""
							: trackers[i].finalUserLastName) + "</td><td>"
					+ trackers[i].imei + "</td></tr>");
}
function showTrackersPrepareData(page, orderBy, orderDirection) {
	jsonObject = {
		entityId : entityIdUrl,
	};

	var searchFilterOption = $("#dropdownBtn").attr("name");
	var searchInput = $.trim($("#searchInput").val());

	if (searchInput !== "") {
		if (searchInput !== "todos") {
			jsonObject[searchFilterOption] = searchInput;
		}
		;
	}
	if (typeof (page) !== undefined) {
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

	return getJsonString(jsonObject);
}
function showListCount(parkLength) {
	$("#trackersCount").html(parkLength);
	if (parkLength != 1) {
		$("#trackersCountTxt").html("usuarios registrados");
	} else {
		$("#trackersCountTxt").html("usuario registrado");
	}
}
function filterList(id) {
	var str = $(id).text();
	$("#dropdownBtn").text(str);
	var name = $(id).attr("id");
	$("#dropdownBtn").attr("name", name);
}

// (+) NUEVA PAGINACION
var MAX_PAGES = 1;
var ACTIVE_PAGE = 1;

function showNextPage() {
	if (ACTIVE_PAGE >= MAX_PAGES)
		return;
	ACTIVE_PAGE++;
	showtrackers(ACTIVE_PAGE, jsonObject.orderBy, jsonObject.orderDirection);
}

function showPreviousPage() {
	if (ACTIVE_PAGE <= 1)
		return;
	ACTIVE_PAGE--;
	showtrackers(ACTIVE_PAGE, jsonObject.orderBy, jsonObject.orderDirection);
}

function buildPagination(jsonObjectUrl) {
	var maxPages = 1;

	var file = SERVER_URL + "/api/tracker/getParkLength?json=" + jsonObjectUrl;
	$.getJSON(file, function(result) {
		if (result.status == "ok") {
			var parkLength = result.data.parkLength;
			showListCount(parkLength)

			var temp = parkLength / PAGE_RESULTS;
			MAX_PAGES = Math.round(temp);
			if (temp > MAX_PAGES)
				MAX_PAGES++;

			if (MAX_PAGES == 1) {
				$("#pgNext").parent().addClass("disabled");
				$("#pgPrevious").parent().addClass("disabled");
			} else {
				if (ACTIVE_PAGE <= 1) {
					$("#pgPrevious").parent().addClass("disabled");
					$("#pgNext").parent().removeClass("disabled");
				} else {
					$("#pgPrevious").parent().removeClass("disabled");
					if (ACTIVE_PAGE == MAX_PAGES)
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

// Order By

function orderEvents() {
	var order;
	$(".orderBy").parent().on("click", function() {
		var orderByCurrent = $(this).attr("name");
		// alert(orderByCurrent);
		if (order !== "ASC" || order == "") {
			showtrackers(undefined, orderByCurrent, "ASC");
			$(".caret").removeClass("inverse");
			$(this).children().addClass("inverse");
			order = "ASC";
		} else {
			$(this).children().removeClass("inverse");
			if ($(this).text() !== clickParent) {
				showtrackers(undefined, orderByCurrent, "ASC");
				order = "ASC";
				$(".caret").removeClass("inverse");
				$(this).children().addClass("inverse");
			} else {
				order = "DESC";
				showtrackers(undefined, orderByCurrent, "DESC");
			}
		}
		clickParent = $(this).text();
		$("#trackersListTable .caret").css("color", "black");
		$("#trackersListTable th").css("color", "black");
		$(this).children().css("color", "#3da8e3");
		$(this).css("color", "#3da8e3");
		pageActive = 1;

		// (+) NUEVA PAGINACION
		ACTIVE_PAGE = 1;
		// (-) NUEVA PAGINACION
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