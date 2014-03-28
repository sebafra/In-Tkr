var SERVER_URL = "http://comovil.cloudapp.net/trackers";

$(document).ready(function () {
  checkId();
  initializeNav();
});

function checkId(){
  if(typeof(localStorage.trackersId) == "undefined"){
    alert("No ha iniciado sesion");
  }
}
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
