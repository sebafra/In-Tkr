var section = "login";

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
      firstName=msg.data.firstName;
      lastName=msg.data.lastName;
      userRole=msg.data.type;
      entityId=msg.data.entityId;
      storageUserInfo(userId,firstName,lastName,userRole,entityId);
      alert("userId:"+userId+"userName:"+firstName+"lastName:"+lastName+"userRole:"+userRole+"entityId:"+entityId);
      window.location = "index.html";
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