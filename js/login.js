$(document).ready(function () {
        //event handler for submit button
        $("#btnLoginSubmit").click(function () {
            //collect userName and password entered by users
            var userName = $("#username").val();
            var password = $("#password").val();
            var userType = $("#userType").val();
            //call the authenticate function
            if (userName !== "" && password !== "") {
              authenticate(userName, password, userType);
            } else {
              showAlert ("msg","danger","Complete todos los campos");
            }

          });
        resetMsg();
      });

//authenticate function to make ajax call
function authenticate(userName, password, userType) {

   var loginFile = SERVER_URL+"/api/user/login?json={name:%22"+ userName +"%22,password:%22"+ password +"%22,type:%22"+ userType +"%22}";
  $.getJSON(loginFile, function(msg) {
    //alert(userName + password + userType);
    if(msg.status=="ok"){
      userId=msg.data.id;
      userName=msg.data.firstName;
      userRole=msg.data.type;
      //entityId="32b223c1-3e8e-0f85-d498-edb5d52569c2";
      entityId=msg.data.entityId;
      storageUserInfo(userId,userName,userRole,entityId);
      window.location = "index.html";
      //$('#result').html(msg.error.message);
                } else {
                  showAlert ("msg","danger",msg.error.message);
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