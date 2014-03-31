 var entityIdUrl = encodeURI(localStorage.trackersEntityId);
 var userOperator;

$(document).ready(function () {
        showOperators();
        initialize();
      });

function initialize () {
  resetOperatorsForm();
  createNewOperator();
  deleteOperator();
}
function showOperators(){
 var loginFile = SERVER_URL+"/api/operatorUser/getAll?json={entityId:%22"+ entityIdUrl +"%22}";
 $.getJSON(loginFile, function(msg) {
  if(msg.status=="ok"){
    operatorUsers=msg.data.operatorUsers;
    operatorUsers.sort(function(a, b){
          if (a.lastName < b.lastName) return -1;
          if (b.lastName < a.lastName) return 1;
          return 0;
      });
    $("#operatorsList").empty();
    for (var i = 0; i < msg.data.operatorUsers.length; i++) {
       fillOperatorsList(i);
       clickRowEvent(i);
       $("#operatorsLoader").remove();
    }
    showOperatorsCount();
    } else {
      showAlert ("msg","danger","Ha ocurrido un error");
    }
  });
}
function fillOperatorsList(i){
  $("#operatorsList").append("<tr id='operator"+i+"'><td>"+ i +"</td><td>"+ operatorUsers[i].firstName +"</td><td>"+ operatorUsers[i].lastName +"</td><td>"+ operatorUsers[i].userName +"</td></tr>");
}
function clickRowEvent(i){
  $("tr#operator"+i).on("click",function(){
      $("#inputOperatorId").val(operatorUsers[i].id);
      $("#inputOperatorFirstName").val(operatorUsers[i].firstName);
      $("#inputOperatorLastName").val(operatorUsers[i].lastName);
      $("#inputOperatorUsername").val(operatorUsers[i].userName);
      $("#inputOperatorPassword").val(operatorUsers[i].userPassword);
  });
}
function showOperatorsCount(){
  $("#operatorsCount").html(operatorUsers.length);
  if (operatorUsers.length!=1) {
    $("#operatorsCountTxt").html("operadores registrados");
  } else {
    $("#operatorsCountTxt").html("operador registrado");
}
}

// Operators Form
function resetOperatorsForm(){
  $("#resetOperatorsForm").click(function() {
    $("#operatorsForm input").val("");
});
}
function createNewOperator(){
            $("#saveOperator").on("click",function(){
                var id = $("#inputOperatorId").val();
                var firstName = $("#inputOperatorFirstName").val();
                var lastName = $("#inputOperatorLastName").val();
                var userName = $("#inputOperatorUsername").val();
                var userPassword = $("#inputOperatorPassword").val();
              if (id=="") {
                var file = SERVER_URL+"/api/operatorUser/create?json={firstName:%22"+ firstName +"%22,lastName:%22"+ lastName +"%22, userName:%22"+ userName +"%22,userPassword:%22"+ userPassword +"%22,entityId:%22"+ entityIdUrl +"%22}";
                if (firstName.trim() !== "" && lastName.trim() !== "" && userName.trim() !== "" && userPassword.trim() !== "") {
                  $.getJSON(file, function(result){
                    if(result.status=="ok"){
                      showAlert ("msg","success","Operador creado con &eacute;xito");
                      showOperators();
                    } else {
                      showAlert ("msg","danger","Ha ocurrido un error");
                    }
                  });
                } else {
                  showAlert ("msg","danger","Complete todos los campos");
                }
              } else {
                var file = SERVER_URL+"/api/operatorUser/update?json={firstName:%22"+ firstName +"%22,lastName:%22"+ lastName +"%22, userName:%22"+ userName +"%22,userPassword:%22"+ userPassword +"%22,entityId:%22"+ entityIdUrl +"%22,id:%22"+ id +"%22}";
                $.getJSON(file, function(result){
                  if(result.status=="ok"){
                    showAlert ("msg","success","Operador modificado con &eacute;xito");
                    showOperators();
                  } else {
                    showAlert ("msg","danger","Ha ocurrido un error");
                  }
                });
              }
            });
}
function deleteOperator() {
   $("#deleteOperator").on("click",function(){
                var id = $("#inputOperatorId").val();
                console.log(id);
  var file = SERVER_URL+"/api/operatorUser/remove?json={id:%22"+ id +"%22}";
                if (id !== "") {
                  $.getJSON(file, function(result){
                    if(result.status=="ok"){
                      showAlert ("msg","success","Operador borrado con &eacute;xito");
                      showOperators();
                    } else {
                      showAlert ("msg","danger","Ha ocurrido un error");
                    }
                  });
                } else {
                  showAlert ("msg","danger","Seleccione un operador de la lista");
                }
});
}
