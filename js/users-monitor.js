 var entityIdUrl = encodeURI(localStorage.trackersEntityId);
 var userOperator;

$(document).ready(function () {
        showOperators();
        initialize();
      });

function initialize () {
  resetOperatorsForm();
  createNewOperator();
}
function showOperators(){
 var loginFile = SERVER_URL+"/api/operatorUser/getAll?json=";
 $.getJSON(loginFile, function(msg) {
  if(msg.status=="ok"){
    operatorUser=msg.data.operatorUsers;
    for (var i = 0; i < msg.data.operatorUsers.length; i++) {
       fillOperatorsList(i);
       clickRowEvent(i);
       $("#operatorsLoader").remove();
    }
    showOperatorsCount();
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
function showOperatorsCount(){
  $("#operatorsCount").append(operatorUser.length);
  if (operatorUser.length!=1) {
    $("#operatorsCountTxt").append("operadores registrados");
  } else {
    $("#operatorsCountTxt").append("operador registrado");
}
}

// Operators Form
function resetOperatorsForm(){
  $("#resetOperatorsForm").click(function() {
    $("#operatorsForm input").val("");
});
}
function createNewOperator(){
            var id = $("#inputOperatorId").val();
            var firstName = $("#inputOperatorFirstName").val();
            var lastName = $("#inputOperatorLastName").val();
            var userName = $("#inputOperatorUsername").val();
            var password = $("#inputOperatorPassword").val();

            $("#saveOperator").on("click",function(){
              if (id=="") {
                var file = SERVER_URL+"/api/operatorUser/create?json={firstName:"+ firstName +",lastName:"+ lastName +", userName:"+ userName +",password:"+ password +",entityId:"+ entityIdUrl +"}";
                $.getJSON(file, function(result){
                  if(result.status=="ok"){
                    $('#msg').addClass("alert alert-success");
                    $('#msg').html("Operador creado con &eacute;xito");
                    $('#msg').slideDown("fast");
                  } else {
                    alert("No anda");
                    //$('#msg').addClass("alert alert-danger");
                    //$('#msg').html("Ha ocurrido un error");
                    //$('#msg').slideDown("fast");
                  }
                });
              } else {
                var file = SERVER_URL+"/api/operatorUser/update?json={firstName:"+ firstName +",lastName:"+ lastName +", userName:"+ userName +",password:"+ password +",entityId:"+ entityIdUrl +",Id:"+ Id +"}";
                $.getJSON(file, function(result){
                  if(result.status=="ok"){
                    $('#msg').addClass("alert alert-success");
                    $('#msg').html("Operador modificado con &eacute;xito");
                    $('#msg').slideDown("fast");
                  } else {
                    $('#msg').addClass("alert alert-danger");
                    $('#msg').html("Ha ocurrido un error");
                    $('#msg').slideDown("fast");
                  }
                });
              }
            });
}
