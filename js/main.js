$(document).ready(function () {
  checkId();
  initializeNav();
});

function initializeNav() {
  //Info Usuario
  $("#userNameNav").html(localStorage.trackersUser);
  if (localStorage.trackersRole==1) {
    $("#userRoleNav").html("Administrador");
  } else if(localStorage.trackersRole==2) {
    $("#userRoleNav").html("Operador");
  } else if(localStorage.trackersRole==3){
    $("#userRoleNav").html("Entidad");
  }
  //Logout
  $("#btnLogout").on("click",function(){

    window.location = "login.html";
  });
}

// Helpers

// Form Alerts | In type use bootstrap classes: danger, success, warning, etc...
function showAlert (divId,type,msg){
  $('#'+divId).addClass("alert alert-"+ type).html(msg).slideDown("fast");
}
// Prevent enter without login first
function checkId(){
  if(typeof(localStorage.trackersId) == "undefined"){
    alert("No ha iniciado sesion");
  }
}