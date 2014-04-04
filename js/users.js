var entityIdUrl = encodeURI(localStorage.trackersEntityId);
var finalUsers;
var inputEmpty = 0;
var serverUrl;
var trackers;

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
  showUsers();
  resetForm();
  showDefaultDateTime();
//  saveUserData();
  filterList();
  imeiList();
}




/******************/
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
	alert(msg);
}

function showMessageOK(msg){
	alert(msg);
}

function formFinalUserCheckData(){
	var checkOK = true;
    var intRegex = /^\d+$/;
    
    if($.trim($("#inputDateTime").val()) == ""){
    	formFinalUserMessage = "Debe ingresar 'Fecha de nacimiento'";
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
    else if($.trim($("#inputUser").val()) == ""){
    	formFinalUserMessage = "Debe ingresar 'Usuario'";
    	checkOK = false;
    }
    else if($.trim($("#inputUserPassword").val()) == ""){
    	formFinalUserMessage = "Debe ingresar 'Password'";
    	checkOK = false;
    }
    else if($.trim($("#inputUserPassword2").val()) == ""){
    	formFinalUserMessage = "Debe ingresar 'Confirmacion de Password'";
    	checkOK = false;
    }
    else if($.trim($("#inputEmail").val()) == ""){
    	formFinalUserMessage = "Debe ingresar 'Email'";
    	checkOK = false;
    }
    else if($.trim($("#inputPhones").val()) == ""){
    	formFinalUserMessage = "Debe ingresar 'Telefonos'";
    	checkOK = false;
    }
    
    return checkOK;
}

function formFinalUserPrepareData(){
	
  	var jsonObject = {
  	  	id:$.trim($("#inputId").val()),
  		firstName:$.trim($("#inputFirstName").val()),
  		lastName:$.trim($("#inputLastName").val()),
  		userName:$.trim($("#inputUser").val()),
  		userPassword:$.trim($("#inputUserPassword").val()),
  		entityId:entityIdUrl,
  		email:$.trim($("#inputEmail").val()),
  		phones:$.trim($("#inputPhones").val()),
  		notes:$.trim($("#inputNotes").val()),
  		dni:$.trim($("#inputDni").val()),
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
        	showMessageOK("Se creo exito!!!");
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
 var loginFile = SERVER_URL+"/api/finalUser/getAll?json={entityId:%22"+ entityIdUrl +"%22}";
 $.getJSON(loginFile, function(msg) {
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


function deleteUser(){
	
    var id = $("#inputId").val();
    if(id == "") return;
    
    var deleteUrl = SERVER_URL+"/api/finalUser/remove?json={id:%22"+ id +"%22}";
    $.getJSON(deleteUrl, function(json) {
        if(json.status == "ok"){
        	showMessageOK("Se elimino con exito!!!");
        } else {
        	showMessageError(json.error.message);
        }
    });
}


function fillUsersList(i){
  $("#usersList").append("<tr id='user"+i+"'><td>"+ finalUsers[i].dni +"</td><td>"+ finalUsers[i].firstName +"</td><td>"+ finalUsers[i].lastName +"</td><td>"+ finalUsers[i].userName +"</td></tr>");
}
function clickRowEvent(i){
  $("tr#user"+i).on("click",function(){
      $("#inputId").val(finalUsers[i].id);
      $("#inputDateTime").val(parseDate(finalUsers[i].datetime));
      $("#inputDni").val(finalUsers[i].dni);
      $("#inputFirstName").val(finalUsers[i].firstName);
      $("#inputLastName").val(finalUsers[i].lastName);
      $("#inputUser").val(finalUsers[i].userName);
      $("#inputUserPassword").val(finalUsers[i].userPassword);
      $("#inputUserPassword2").val(finalUsers[i].userPassword);
      $("#inputEmail").val(finalUsers[i].email);
      //$("#inputImei").val(finalUsers[i].imei);
      $("#inputNotes").val(finalUsers[i].notes);
      $("#inputPhones").val(finalUsers[i].phones);
      $("#inputPictureOld").val(finalUsers[i].picture);
      showUserPhoto(finalUsers[i].picture);
      imeiSelected(finalUsers[i].imei);
      if(finalUsers[i].trackerId != undefined)
    	  addImeiToList(finalUsers[i].trackerId);
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
  var myNewDate = new Date(currentField);
  var date = myNewDate.getDate();
  var month = myNewDate.getMonth()+1;
  var year = myNewDate.getFullYear();

   return date +"-"+ month +"-"+ year;
}
function showUserPhoto(picture){
  if (picture !== undefined) {
    $("#finalUserPhoto").attr({
      src: SERVER_URL + picture
    });
  }
}
function showDefaultDateTime(){
  var currentTime = new Date();
  var date = currentTime.getDate();
  var month = currentTime.getMonth();
  var year = currentTime.getFullYear();

  var total = date + "-" + month + "-" + year;
  $("#inputDateTime").attr({
    value: total,
  });
}
function resetForm(){
  $("#resetForm").click(function(){
    $("#finalUsersForm input").val("");
    $("#finalUsersForm textarea").val("");

    imeiListReload();
    
    setTimeout(function(){showDefaultDateTime();}, 1000); //No anda
    });
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
    var userName = $("#inputUserName").val();
    checkInput("#inputUserName");
    var userPassword = $("#inputUserPassword").val();
    checkInput("#inputUserPassword");
    var userPassword2 = $("#inputUserPassword2").val();
    checkInput("#inputUserPassword2");
    var email = $("#inputEmail").val();
    checkInput("#inputEmail");
    var imei = $("#inputImei").val();
    checkInput("#inputImei");
    var notes = $("#inputNotes").val();
    checkInput("#inputNotes");
    var phones = $("#inputPhones").val();
    checkInput("#inputPhones");

    alert(datetime +"*-*"+ dni +"*-*"+ firstName +"*-*"+ lastName +"*-*"+ userName +"*-*"+ userPassword +"*-*"+ userPassword2 +"*-*"+ email +"*-*"+ imei +"*-*"+ notes +"*-*"+ phones);

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
    var str = $(this).text();
    $("#dropdownBtn").text(str);
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
	if(trackers == undefined) return;
	
    for (var i = 0; i < trackers.length; i++) {
    	if(trackers[i].id == trackerId){
    		$("#inputImei").append("<option selected=true value="+trackers[i].id+">"+trackers[i].imei+"</option>");

    		break;
    	}
    }
}


function imeiSelected(imeiActual){
  for (var i = 0; i < imeiValues.length; i++) {
      if (imeiValues[i]==imeiActual) {
        $("#inputImei").prop("selectedIndex",i);
      }
    }
}