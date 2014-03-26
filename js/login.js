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
            };

          });
        resetMsg();
      });

//authenticate function to make ajax call
function authenticate(userName, password) {

   var loginFile = "http://comovil.cloudapp.net/trackers/api/user/login?json={name:%22jmoreno%22,password:%22jmoreno%22,type:%221%22}";
  //var loginFile = "json/login.jsp?json={name:"+ userName +",password:"+ password +",type:%221%22}";
  $.getJSON(loginFile, function(msg) {
    if(msg.status=="ok"){
      userId=msg.data.id;
      userName=msg.data.userName;
      userRole=msg.data.type;
      alert(userId + userName + userRole);
      storageUserInfo(userId,userName,userRole);
      window.location = "index.html";
                } else {
                  $('#result').html(msg.error.message);
                }
              });
}
function resetMsg(){
  if ($("#msg").is(":visible")) {
    $("#username,#password").focus(function(){
      $("#msg").slideUp("fast");
    }
    );
  }
}
//LocalStorage User Info
function storageUserInfo(id,userName,role){
  if(typeof(Storage)!=="undefined")
  {
  localStorage.setItem("trackersId", id);
  localStorage.setItem("trackersUser", userName);
  localStorage.setItem("trackersRole", role);
  }
else
  {
  alert("No Web Storage support");
  }
}