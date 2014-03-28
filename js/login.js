$(document).ready(function () {
        //event handler for submit button
        $("#btnLoginSubmit").click(function () {
            //collect userName and password entered by users
            var userName = $("#username").val();
            var password = $("#password").val();

            //call the authenticate function
            if (userName !== "" && password !== "") {
              authenticate(userName, password);
            } else {
              $('#msg').addClass("alert alert-danger");
              $('#msg').html("Complete los campos");
              $('#msg').slideDown("fast");
            }

          });
        resetMsg();
      });

//authenticate function to make ajax call
function authenticate(userName, password) {

   var loginFile = SERVER_URL+"/api/user/login?json={name%3A%22jmoreno%22%2Cpassword%3A%22jmoreno%22%2C%20type%3A%221%22}";
  $.getJSON(loginFile, function(msg) {
    if(msg.status=="ok"){
      userId=msg.data.id;
      userName=msg.data.name;
      userRole=msg.data.type;
      entityId="32b223c1-3e8e-0f85-d498-edb5d52569c2";
      //alert(userId + userName + userRole + entityId);
      storageUserInfo(userId,userName,userRole,entityId);
      window.location = "index.html";
                } else {
                  $('#result').html(msg.error.message);
                }
              });
}
function resetMsg(){
  if ($("#msg").is(":visible")) {
    $("#username,#password").on("focus",function(){
      $("#msg").slideUp("fast");
    }
    );
  }
}
//LocalStorage User Info
function storageUserInfo(id,userName,role,entityId){
  if(typeof(Storage)!=="undefined")
  {
  localStorage.setItem("trackersId", id);
  localStorage.setItem("trackersUser", userName);
  localStorage.setItem("trackersRole", role);
  localStorage.setItem("trackersEntityId", entityId);
  }
else
  {
  alert("No Web Storage support");
  }
}