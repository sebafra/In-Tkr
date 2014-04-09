var entityIdUrl = encodeURI(localStorage.trackersEntityId);
var finalUsers;
var inputEmpty = 0;
var serverUrl;
var trackers;
var trackersAll;

$(document).ready(function () {
	initialize();
	obtainServerUrl();
});

function obtainServerUrl(){
	serverUrl = window.location.protocol + "//" + window.location.host;
	var loc = window.location.pathname;
	var directories=loc.split('/');
	for(i = 1 ; i < directories.length - 1; i++){
		serverUrl += "/" + directories[i];
	}
}

function initialize () {
  // Search Btn
  $("#usersSearchBtn").on("click",function(){
    $("#usersSearch").toggle("fast");
  });
  
  $("#deleteUser").on("click",function(){
	    deleteUser();
  });
  
  showUserPhoto();
  //showUsers();
  getAllTrackers();
  resetForm();
//  showDefaultDateTime();
//  saveUserData();
  filterList();
  //imeiList();

	$("#searchBtn").on('click', function() {
		searchUsers();
	});
/*	$("#dropdownUl li").on("click", function() {
		filterList(this);
	});*/
}

function filterList(id) {
	var str = $(id).text();
	$("#dropdownBtn").text(str);
	var name = $(id).attr("id");
	$("#dropdownBtn").attr("name", name);
}

function searchUsers(){
	
	var jsonObject = {
		entityId : entityIdUrl
	}

	var searchFilterOption = $("#dropdownBtn").attr("name");
	var searchInput = $.trim($("#searchInput").val());
	if (searchInput !== "") {
		if (searchInput !== "todos") {
			jsonObject[searchFilterOption] = searchInput;
		}
	}

	var url = SERVER_URL + "/api/finalUser/getAll?json=" + getJsonString(jsonObject);
	$.getJSON(url, function(msg) {
		if (msg.status == "ok") {
			finalUsers = msg.data.finalUsers;
			finalUsers.sort(function(a, b) {
				if (a.lastName < b.lastName)
					return -1;
				if (b.lastName < a.lastName)
					return 1;
				return 0;
			});
			$("#usersList").empty();
			for (var i = 0; i < msg.data.finalUsers.length; i++) {
				fillUsersList(i);
				clickRowEvent(i);
			}
			$("#usersListLoader").remove();
			showListCount();
			clearForm();
		} else {
			showAlert("msg", "danger", msg.error.message);
		}
	});
}

function initializeData(){
  // showUsers();
  // imeiListReload();
	getAllTrackers();
  clearForm();
  // showDefaultDateTime();
  filterList();
}




/** *************** */
/** (+) SAVE      */

var formFinalUserMessage = "";
var formFinalUserSubmitted = false;
function formFinalUserPrepare(){
	if(!formFinalUserCheckData()){
		showMessageError(formFinalUserMessage);
		return false;
	}
	formFinalUserSubmitted = true;
	
	return formFinalUserPrepareData();
}

function showMessageError(msg){
	showAlert ("msg_form","danger",msg);
}

function showMessageOK(msg){
	showAlert ("msg_form","success",msg);
}


function getDateMilliseconds(val){
	var v = val.split("-");
	
	day = parseInt(v[2]);
	month = parseInt(v[1]);
	year = parseInt(v[0]);	
	
	//var d = new Date(v[0], v[1] - 1, v[2]);
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

function formFinalUserCheckData(){
	var checkOK = true;
    var intRegex = /^\d+$/;
    
    if($.trim($("#inputDateTime").val()) == ""){
    	formFinalUserMessage = "Debe ingresar 'Fecha de nacimiento'";
    	checkOK = false;
    }
    else if( !dateFormatOK( $.trim( $("#inputDateTime").val() ) ) ){
    	formFinalUserMessage = "Debe ingresar 'Fecha de nacimiento' adecauda";
    	checkOK = false;
    }
    else if($.trim($("#inputDni").val()) == ""){
    	formFinalUserMessage = "Debe ingresar 'DNI'";
    	checkOK = false;
    }
    else if($.trim($("#inputFirstName").val()) == ""){
    	formFinalUserMessage = "Debe ingresar 'Nombre'";
    	checkOK = false;
    }
    else if($.trim($("#inputLastName").val()) == ""){
    	formFinalUserMessage = "Debe ingresar 'Apellido'";
    	checkOK = false;
    }
    else if($.trim($("#inputEmail").val()) == ""){
    	formFinalUserMessage = "Debe ingresar 'Email'";
    	checkOK = false;
    }
/*    else if($.trim($("#inputPhones").val()) == ""){
    	formFinalUserMessage = "Debe ingresar 'Telefonos'";
    	checkOK = false;
    }*/
    
    return checkOK;
}

function formFinalUserPrepareData(){
	
  	var jsonObject = {
  	  	id:$.trim($("#inputId").val()),
  		firstName:$.trim($("#inputFirstName").val()),
  		lastName:$.trim($("#inputLastName").val()),
  		entityId:entityIdUrl,
  		email:$.trim($("#inputEmail").val()),
  		phones:$.trim($("#inputPhones").val()),
  		notes:$.trim($("#inputNotes").val()),
  		dni:$.trim($("#inputDni").val()),
  		datetime:getDateMilliseconds($.trim($("#inputDateTime").val())),
  		pictureOld:$.trim($("#inputPictureOld").val())
  		}
  	
  	var trackerId = $("#inputImei option:selected").val();
  	if(trackerId != "0"){
  		jsonObject.trackerId = trackerId;  		
  	}
  	
  	$("#json").val(getJsonString(jsonObject));
  	
	return true;
}

function formFinalUserCheckSubmission(){
	
	if(!formFinalUserSubmitted) return;

	
	try{
		//hideMessages();
        var f = $("#formFinalUserResultFrame").contents().text();
        f = f.replace("if (window.top.ripple) { window.top.ripple(\"bootstrap\").inject(window, document); }","");
        var json = $.parseJSON(f);

        formParticipacionSubmitted = false;
        if(json.status == "ok"){
    		//window.location = 'exito.html';
        	showMessageOK("Se actualizo la informacion con exito!!!");
        	initializeData();
        } else {
        	showMessageError(json.error.message);
        }
    }catch(e){
    	showMessageError(e);
    }
}

var formFinalUserImportSubmitted = false;
function formFinalUserImportPrepare(){
	formFinalUserImportSubmitted = true;
	
  	var jsonObject = {
  	  		entityId:entityIdUrl
  	  		}
  	  	
  	  	$("#jsonImport").val(getJsonString(jsonObject));	
	
	return true;
}

function formFinalUserImportCheckSubmission(){
	
	if(!formFinalUserImportSubmitted) return;

	
	$('#importModal').modal("hide");

	
	try{
		//hideMessages();
        var f = $("#formFinalUserImportResultFrame").contents().text();
        f = f.replace("if (window.top.ripple) { window.top.ripple(\"bootstrap\").inject(window, document); }","");
        var json = $.parseJSON(f);

        formParticipacionImportSubmitted = false;
        if(json.status == "ok"){
    		//window.location = 'exito.html';
        	showMessageOK("Se actualizo la informacion con exito!!!");
        	initializeData();
        } else {
        	showMessageError(json.error.message);
        }
    }catch(e){
    	showMessageError(e);
    }
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
/** (-) SAVE      */
/******************/




function showUsers(){
	
	var jsonObject = {
			entityId : entityIdUrl
		}

		var searchFilterOption = $("#dropdownBtn").attr("name");
		var searchInput = $.trim($("#searchInput").val());
		if (searchInput !== "") {
			if (searchInput !== "todos") {
				jsonObject[searchFilterOption] = searchInput;
			}
		}

		var url = SERVER_URL + "/api/finalUser/getAll?json=" + getJsonString(jsonObject);	
	
// var loginFile = SERVER_URL+"/api/finalUser/getAll?json={entityId:%22"+ entityIdUrl +"%22}";
 $.getJSON(url, function(msg) {
  if(msg.status=="ok"){
    finalUsers=msg.data.finalUsers;
    finalUsers.sort(function(a, b){
          if (a.lastName < b.lastName) return -1;
          if (b.lastName < a.lastName) return 1;
          return 0;
      });
    $("#usersList").empty();
    for (var i = 0; i < msg.data.finalUsers.length; i++) {
       fillUsersList(i);
       clickRowEvent(i);
    }
    $("#usersListLoader").remove();
    showListCount();
    } else {
      showAlert ("msg","danger",msg.error.message);
    }
  });
}


function getAllTrackers(){
	var url = SERVER_URL+"/api/tracker/getAll?json={entityId:%22"+ entityIdUrl +"%22}";
	$.getJSON(url, function(msg) {
		if(msg.status=="ok"){
			trackersAll=msg.data.trackers;
			showUsers();
			imeiList();
		}
	});
}


function deleteUser(){
	
    var id = $("#inputId").val();
    if(id == "") return;
    
    var deleteUrl = SERVER_URL+"/api/finalUser/remove?json={id:%22"+ id +"%22}";
    $.getJSON(deleteUrl, function(json) {
        if(json.status == "ok"){
        	showMessageOK("Se elimino con exito!!!");
        	initializeData();

        } else {
        	showMessageError(json.error.message);
        }
    });
}

function getImei(trackerId){
    for (var i = 0; i < trackersAll.length; i++) {
    	if(trackersAll[i].id == trackerId)
    		return trackersAll[i].imei;
    }
    return "";
}

function fillUsersList(i){
	var imei = getImei(finalUsers[i].trackerId);
	
	$("#usersList").append("<tr id='user"+i+"' style='cursor:pointer'><td>"+ finalUsers[i].dni +"</td><td>"+ finalUsers[i].firstName +"</td><td>"+ finalUsers[i].lastName +"</td><td>"+ imei +"</td></tr>");
}

function clickRowEvent(i){
  $("tr#user"+i).on("click",function(){
      $("#inputId").val(finalUsers[i].id);
      $("#inputDateTime").val(parseDate(finalUsers[i].datetime));
      $("#inputDni").val(finalUsers[i].dni);
      $("#inputFirstName").val(finalUsers[i].firstName);
      $("#inputLastName").val(finalUsers[i].lastName);
      $("#inputEmail").val(finalUsers[i].email);
      //$("#inputImei").val(finalUsers[i].imei);
      $("#inputNotes").val(finalUsers[i].notes);
      $("#inputPhones").val(finalUsers[i].phones);
      $("#inputPictureOld").val(finalUsers[i].picture);
      showUserPhoto(finalUsers[i].picture);

	  imeiList();
      if(finalUsers[i].trackerId != undefined){
    	  addImeiToList(finalUsers[i].trackerId);
    	  //selectImei(finalUsers[i].trackerId);
      }
  });
}
function showListCount(){
  $("#finalUsersCount").html(finalUsers.length);
  if (finalUsers.length!=1) {
    $("#finalUsersCountTxt").html("usuarios registrados");
  } else {
    $("#finalUsersCountTxt").html("usuario registrado");
}
}

// User Form

function parseDate(currentField){
/*  var myNewDate = new Date(currentField);
  var date = myNewDate.getDate();
  var month = myNewDate.getMonth()+1;
  var year = myNewDate.getFullYear();

   return date +"-"+ month +"-"+ year;*/
	
	var now = new Date(currentField);

	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);

	var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
	
	return today;

}
function showUserPhoto(picture){
  if (picture !== undefined) {
    $("#finalUserPhoto").attr({
      src: SERVER_URL + picture + "?" + new Date().getTime()
    });
  }
}
function showDefaultDateTime(){
  var currentTime = new Date();
  var date = currentTime.getDate();
  var month = currentTime.getMonth();
  var year = currentTime.getFullYear();

  var total = date + "-" + month + "-" + year;
  $("#inputDateTime").val(total);
}
function resetForm(){
  $("#resetForm").click(function(){
	  clearForm();
    });
}

function clearForm(){
    $("#finalUsersForm input").val("");
    $("#finalUsersForm textarea").val("");
    //$(".fileinput-exists").click();
    
    try{
        $(".fileinput-exists").fileinput('reset');
        
        $("#finalUserPhoto").attr({
            src: "img/user_avatar.png"
          });
    }catch(e){
    	
    }
    //showDefaultDateTime();
    //imeiListReload();
    imeiList();
    
    //setTimeout(function(){showDefaultDateTime();}, 1000); //No anda
}

function saveUserData(){
  $("#saveUser").on("click",function(){
    var id = $("#inputId").val();
    var datetime = $("#inputDateTime").val();
    checkInput("#inputDateTime");
    var dni = $("#inputDni").val();
    checkInput("#inputDni");
    var firstName = $("#inputFirstName").val();
    checkInput("#inputFirstName");
    var lastName = $("#inputLastName").val();
    checkInput("#inputLastName");
    var email = $("#inputEmail").val();
    checkInput("#inputEmail");
    var imei = $("#inputImei").val();
    checkInput("#inputImei");
    var notes = $("#inputNotes").val();
    checkInput("#inputNotes");
    var phones = $("#inputPhones").val();
    checkInput("#inputPhones");

    alert(datetime +"*-*"+ dni +"*-*"+ firstName +"*-*"+ lastName +"*-*"+ email +"*-*"+ imei +"*-*"+ notes +"*-*"+ phones);

    if (inputEmpty === 0) {
      if (checkEmail()===true) {
        if (id==="") {
          var file = "{datetime:%22"+ datetime +"%22,entityId:%22"+ entityIdUrl +"%22,userName:%22"+ userName +"%22,userPassword:%22"+ userPassword +"%22,firstName:%22"+ firstName +"%22,lastName:%22"+ lastName +"%22,email:%22"+ email +"%22,phones:%22"+ phones +"%22,notes:%22"+ notes +"%22,dni:%22"+ dni +"%22}";
          //$("#jsonVars").setAttribute('value', file);
          alert(file);
          $("#finalUsersForm").submit();
        } else {
          var file = "{id:%22"+ id +"%22,datetime:%22"+ datetime +"%22,entityId:%22"+ entityIdUrl +"%22,userName:%22"+ userName +"%22,userPassword:%22"+ userPassword +"%22,firstName:%22"+ firstName +"%22,lastName:%22"+ lastName +"%22,email:%22"+ email +"%22,phones:%22"+ phones +"%22,notes:%22"+ notes +"%22,dni:%22"+ dni +"%22}";
        }
      } else {
        alert("false");
        showAlert ("msg_form","danger","Las contrase&ntilde;as no coinciden");
      }
    } else {
      showAlert ("msg_form","danger","Complete todos los campos");
    }
  });
}
function checkEmail(){
      var userPassword = $("#inputUserPassword").val();
      var userPassword2 = $("#inputUserPassword2").val();
      console.log(userPassword+" "+userPassword2);
      if (typeof(userPassword) == typeof(userPassword2)) {
        return true;
      } else if(typeof(userPassword) !== typeof(userPassword2)) {
        return false;
      } else if(typeof(userPassword) == "") {
        return false;
      }
    }
function checkInput(input){
     if($(input).val() == ''){
      $(input).parents("div.form-group").addClass("has-error");
      inputEmpty = 1;      //$(input).parents("div.form-group").removeClass("has-error");
      setTimeout( function() {  $(input).parents("div.form-group").removeClass("has-error"); }, 5000);
    }
}
function filterList(){
  $("#dropdownUl li").on("click",function(){
    //var str = $(this).text();
    //$("#dropdownBtn").text(str);
    
	var str = $(this).text();
	$("#dropdownBtn").text(str);
	var name = $(this).attr("id");
	$("#dropdownBtn").attr("name", name);
	
	
  });
}

function imeiListReload(){
	if(trackers == undefined) return;
	
	$("#inputImei").empty();
    $("#inputImei").append("<option value=0>SIN IMEI</option>");

    for (var i = 0; i < trackers.length; i++) {
    	if(trackers[i].finalUserId == undefined)
    		$("#inputImei").append("<option value="+trackers[i].id+">"+trackers[i].imei+"</option>");
    }

}

function imeiList(){
	$("#inputImei").empty();
	$("#inputImei").append("<option value=0>SIN IMEI</option>");
    for (var i = 0; i < trackersAll.length; i++) {
    	if(trackersAll[i].finalUserId == undefined)
    		$("#inputImei").append("<option value="+trackersAll[i].id+">"+trackersAll[i].imei+"</option>");
    }
}



function imeiListOld(){
//  var imeiItems = SERVER_URL+"/api/tracker/getAllNotAssigned?json={entityId:%22"+ entityIdUrl +"%22}";
	  var imeiItems = SERVER_URL+"/api/tracker/getAll?json={entityId:%22"+ entityIdUrl +"%22}";
 $.getJSON(imeiItems, function(msg) {
  if(msg.status=="ok"){
    imeiValues = msg.data.trackers;

    trackers = msg.data.trackers;
    $("#inputImei").append("<option value=0>SIN IMEI</option>");
    for (var i = 0; i < msg.data.trackers.length; i++) {
    	if(msg.data.trackers[i].finalUserId == undefined)
      $("#inputImei").append("<option value="+msg.data.trackers[i].id+">"+msg.data.trackers[i].imei+"</option>");
    }
    } else {
      showAlert ("msg","danger",msg.error.message);
    }
  });
}


function addImeiToList(trackerId){
	if(trackerId == undefined) return;
	if(trackersAll == undefined) return;
	
    for (var i = 0; i < trackersAll.length; i++) {
    	if(trackersAll[i].id == trackerId){
    		$("#inputImei").prepend("<option selected=true value="+trackersAll[i].id+">"+trackersAll[i].imei+"</option>");
            $("#inputImei").prop("selectedIndex",0);

    		break;
    	}
    }
}


function selectImei(imeiActual){
  for (var i = 0; i < imeiValues.length; i++) {
      if (imeiValues[i]==imeiActual) {
        $("#inputImei").prop("selectedIndex",i);
      }
    }
}


function imeiSelectedOld(imeiActual){
  for (var i = 0; i < imeiValues.length; i++) {
      if (imeiValues[i]==imeiActual) {
        $("#inputImei").prop("selectedIndex",i);
      }
    }
}