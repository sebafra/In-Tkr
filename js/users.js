var entityIdUrl = encodeURI(localStorage.trackersEntityId);
var finalUsers;
var inputEmpty = 0;

$(document).ready(function () {
        initialize();
      });

function initialize () {
  // Search Btn
  $("#usersSearchBtn").on("click",function(){
    $("#usersSearch").toggle("fast");
  });
  showUserPhoto();
  showUsers();
  resetForm();
  showDefaultDateTime();
  saveUserData();
  filterList();
  imeiList();
}

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
function fillUsersList(i){
  $("#usersList").append("<tr id='user"+i+"'><td>"+ finalUsers[i].id +"</td><td>"+ finalUsers[i].firstName +"</td><td>"+ finalUsers[i].lastName +"</td><td>"+ finalUsers[i].userName +"</td></tr>");
}
function clickRowEvent(i){
  $("tr#user"+i).on("click",function(){
      $("#inputId").val(finalUsers[i].id);
      $("#inputDateTime").val(parseDate(finalUsers[i].datetime));
      $("#inputDni").val(finalUsers[i].dni);
      $("#inputFirstName").val(finalUsers[i].firstName);
      $("#inputLastName").val(finalUsers[i].lastName);
      $("#inputUserName").val(finalUsers[i].userName);
      $("#inputUserPassword").val(finalUsers[i].userPassword);
      $("#inputUserPassword2").val(finalUsers[i].userPassword);
      $("#inputEmail").val(finalUsers[i].email);
      //$("#inputImei").val(finalUsers[i].imei);
      $("#inputNotes").val(finalUsers[i].notes);
      $("#inputPhones").val(finalUsers[i].phones);
      showUserPhoto(finalUsers[i].finalUserPictureUrl);
      imeiSelected(finalUsers[i].imei);
      alert(finalUsers[i].id);
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
function showUserPhoto(finalUserPictureUrl){
  if (finalUserPictureUrl !== undefined) {
    $("#finalUserPhoto").attr({
      src: "img/"+finalUserPictureUrl,
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
function imeiList(){
  var imeiItems = SERVER_URL+"/api/tracker/getAllNotAssigned?json={entityId:%22"+ entityIdUrl +"%22}";
 $.getJSON(imeiItems, function(msg) {
  if(msg.status=="ok"){
    imeiValues = msg.data.trackers;
    for (var i = 0; i < msg.data.trackers.length; i++) {
      $("#inputImei").append("<option value="+i+">"+msg.data.trackers[i].imei+"</option>");
    }
    } else {
      showAlert ("msg","danger",msg.error.message);
    }
  });
}
function imeiSelected(imeiActual){
  for (var i = 0; i < imeiValues.length; i++) {
      if (imeiValues[i]==imeiActual) {
        $("#inputImei").prop("selectedIndex",i);
      }
    }
}