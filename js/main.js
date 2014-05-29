var section;

$(document).ready(function () {
  if(OBTAIN_URL_DINAMICALLY)obtainServerUrl();
  checkId();
  initializeNav();
});


function obtainServerUrl(){
	//alert(SERVER_URL);
	var serverUrl = window.location.protocol + "//" + window.location.host;
	var loc = window.location.pathname;
	var directories=loc.split('/');
	for(i = 1 ; i < directories.length - 1; i++){
		serverUrl += "/" + directories[i];
	}

	SERVER_URL = serverUrl;
	//alert(SERVER_URL);
}


function initializeNav() {
  //Info Usuario
  $("#userNameNav").html(localStorage.trackersLastName+" "+localStorage.trackersFirstName);
  if (localStorage.trackersRole==1) {
    $("#userRoleNav").html("Administrador");
  } else if(localStorage.trackersRole==2) {
    $("#userRoleNav").html("Operador");
  } else if(localStorage.trackersRole==3){
    $("#userRoleNav").html("Entidad");
  }
  //ChangeUser
  changeUserPass();
  //Logout
  $("#btnLogout").on("click",function(){
    localStorage.removeItem("trackersEntityId");
    localStorage.removeItem("trackersId");
    localStorage.removeItem("trackersRole");
    localStorage.removeItem("trackersFirstName");
    localStorage.removeItem("trackersLastName");
    window.location = "login.html";
  });
  buildNav();
}

function buildNav(){
  if (localStorage.trackersRole!=2) {
    $("li#usersMenu").show();
  }
}
function changeUserPass(){
   $("#savePassForm").on("click",function(){
                var oldPassword = $("#inputActualPass").val();
                var newPassword = $("#inputNewPass").val();
                var newPassword2 = $("#inputNewPass2").val();
                var id = localStorage.trackersId;
                var type = localStorage.trackersRole;
                //alert(oldPassword + newPassword + newPassword2 + id + type);
  var file = SERVER_URL+"/api/user/updatePassword?json={id:%22"+ id +"%22,oldPassword:%22"+ oldPassword +"%22,newPassword:%22"+ newPassword +"%22,type:%22"+ type +"%22}";
                if (oldPassword !== "" && newPassword !== "" && newPassword2 !== "") {
                  if (newPassword == newPassword2) {
                  $.getJSON(file, function(result){
                    if(result.status=="ok"){
                      $("#msg-modal").empty();
                      showAlert ("msg-modal","success","Constrase&ntilde;a modificada con &eacute;xito");
                      $('#myModal').delay(3000).modal('hide');
                    } else {
                      showAlert("msg-modal","danger",result.error.message);
                    }
                  });
                } else {
                  showAlert("msg-modal","danger","Complete todos los campos");
                }
              } else {
                showAlert("msg-modal","danger","Las contrase&ntilde;as no coinciden");
              }
});
  $("#resetPassForm").on("click",function() {
    $("#inputActualPass,#inputNewPass,#inputNewPass2").val("");
  });
}

// Helpers

// Form Alerts | In type use bootstrap classes: danger, success, warning, etc...
function showAlert (divId,type,msg){
  $('#'+divId).removeClass();
  $('#'+divId).addClass("alert alert-"+ type).html(msg).slideDown("fast");
  $('#'+divId).delay(2500).slideUp("fast");
}
// Prevent enter without login first
function checkId(){
  if(typeof(localStorage.trackersId) == "undefined" && section != "login"){
    //alert("No ha iniciado sesion");
    window.location = "login.html";
  }
}
