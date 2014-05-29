var section = "login";
var inputEmpty = 0;

$(document).ready(function () {
        //event handler for submit button
        $("#btnLoginSubmit").click(function () {
            //collect userName and password entered by users
            var userName = $("#username").val();
            var password = $("#password").val();
            var userType = $("#userType").val();
            //call the authenticate function
            if (userName !== "" || password !== "") {
              authenticate(userName, password, userType);
            } else {
              showAlert ("msg","danger","Complete todos los campos");
            }
          });
        resetMsg();
        $("#saveForm").on("click",function(){
          createNewEntity();
        });
        $("#resetForm").on("click",function(){
          resetForm();
        });
        $('#createEntity').on('show.bs.modal', function (e) {
          resetForm();
        });
      });

//authenticate function to make ajax call
function authenticate(userName, password, userType) {
  $("#btnLoginSubmit").html("<img src='img/ajax-loader.gif' alt='placeholder+image'>");
 var loginFile = SERVER_URL+"/api/user/login?json={name:%22"+ userName +"%22,password:%22"+ password +"%22,type:%22"+ userType +"%22}";
 $.getJSON(loginFile, function(msg) {
    if(msg.status=="ok"){
      userId=msg.data.id;
      firstName=msg.data.firstName;
      lastName=msg.data.lastName;
      userRole=msg.data.type;
      entityId=msg.data.entityId;
      storageUserInfo(userId,firstName,lastName,userRole,entityId);
      window.location = "index.html";
    } else {
      showAlert ("msg","danger",msg.error.message);
      $("#btnLoginSubmit").html("Ingresar");
    }
  });
}
function resetMsg(){
  if ($("#msg").is(":visible")) {
    $("#username,#password,#userType").on("focus",function(){
      $("#msg").slideUp("fast");
    }
    );
  }
}
//LocalStorage User Info
function storageUserInfo(id,firstName,lastName,role,entityId){
  if(typeof(Storage)!=="undefined")
  {
  localStorage.setItem("trackersId", id);
  localStorage.setItem("trackersFirstName", firstName);
  localStorage.setItem("trackersLastName", lastName);
  localStorage.setItem("trackersRole", role);
  localStorage.setItem("trackersEntityId", entityId);
  }
else
  {
  alert("No Web Storage support");
  }
}
//Alta de Entidad

function createNewEntity(){
  $("#saveForm").html("<img src='img/ajax-loader.gif' alt='placeholder+image'>");
  inputEmpty = 0;
  var name = $("#entityName").val();
  checkInput("#entityName");
  var userName = $("#entityUserName").val();
  checkInput("#entityUserName");
  var userEmail = $("#entityEmail").val();
  checkInput("#entityEmail");
  var userPassword = $("#entityPassword").val();
  checkInput("#entityPassword");
  var userPassword2 = $("#entityPassword2").val();
  checkInput("#entityPassword2");

 if (inputEmpty === 0) {
  if(checkPassword(userPassword,userPassword2)===true){
    $("#saveForm").attr("disabled", "disabled");
      var entityFile = SERVER_URL+"/api/entity/create?json={name:%22"+ name +"%22,userName:%22"+ userName +"%22,userPassword:%22"+ userPassword +"%22,email:%22"+ userEmail +"%22}";
      $.getJSON(entityFile, function(msg) {
        if(msg.status=="ok"){
         showAlert ("msg-modal","success","Entidad creada con &eacute;xito");
         $("#createEntity .modal-footer").slideUp("fast");
         setTimeout(function(){
          $('#createEntity').modal('hide');
          $("#createEntity .modal-footer").show("slow");
        }, 3000);
       } else {
        showAlert ("msg-modal","danger",msg.error.message);
      }
      $("#saveForm").removeAttr("disabled", "disabled");
      $("#saveForm").html("Guardar");
    }); // getJson ends
    } else {
      $("#saveForm").html("Guardar");
      showAlert ("msg-modal","danger","Las contrase&ntilde;as no coinciden"); //inputEmpty
    }
  } else {
    $("#saveForm").html("Guardar");
      showAlert ("msg-modal","danger","Complete todos los campos"); //inputEmpty
    }
}
// Clean Form Button
function resetForm(){
    $("#createEntityForm input").val("");
}
function checkInput(input){
     if($(input).val() == ''){
      $(input).parents("div.form-group").addClass("has-error");
      inputEmpty = 1;      //$(input).parents("div.form-group").removeClass("has-error");
      setTimeout( function() {
        $(input).parents("div.form-group").removeClass("has-error");
        inputEmpty = 0;
      }, 5000);
    }
}
function checkPassword(a,b){
      if (a == b) {
        return true;
      } else if(a !== b) {
        return false;
      }
    }