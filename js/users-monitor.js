 var entityIdUrl = encodeURI(localStorage.trackersEntityId);
 var userOperator;

$(document).ready(function () {
        showOperators();
      });

function getFormData(){
          //event handler for submit button
          //$("#btnLoginSubmit").click(function () {
            //collect userName and password entered by users

            var firstName = $("#inputOperatorFirstName").val();
            var lastName = $("#inputOperatorLastName").val();
            var userName = $("#inputOperatorUsername").val();
            var password = $("#inputOperatorPassword").val();

            //call the authenticate function
            // if (firstName !== "" && lastName !== "" && userName !== "" && password !== "") {
            //   authenticate(userName, password);
            // } else {
            //   //$('#msg').addClass("alert alert-danger");
            //   //$('#msg').html("Complete los campos");
            //   //$('#msg').slideDown("fast");
            // }
            //});
        }
function showOperators(){
 var loginFile = SERVER_URL+"/api/operatorUser/getAll?json=";
 $.getJSON(loginFile, function(msg) {
  if(msg.status=="ok"){
    operatorUser=msg.data.operatorUsers;
    for (var i = 0; i < msg.data.operatorUsers.length; i++) {
       fillOperatorsList(i);
       clickRowEvent(i);
    }
    } else {
      //$('#result').html(msg.error.message);
    }
  });
}

function fillOperatorsList(i){
  //alert(operatorUser[i].firstName);
  $("#operatorsList").append("<tr id='operator"+i+"'><td>"+ i +"</td><td>"+ operatorUser[i].firstName +"</td><td>"+ operatorUser[i].lastName +"</td><td>"+ operatorUser[i].userName +"</td></tr>");
}
function clickRowEvent(i){
  $("tr#operator"+i).on("click",function(){
      $("#inputOperatorFirstName").val(operatorUser[i].firstName);
      $("#inputOperatorLastName").val(operatorUser[i].lastName);
      $("#inputOperatorUsername").val(operatorUser[i].userName);
      $("#inputOperatorPassword").val(operatorUser[i].userPassword);
  });
}
