 var entityIdUrl = encodeURI(localStorage.trackersEntityId);
 var userOperator;

$(document).ready(function () {
        showOperators();
        initialize();
      });

function initialize () {
  resetOperatorsForm();
  saveOperator();
  deleteOperator();
  $("#resetOperatorsForm").click(function() {
    resetOperatorsForm();
  });
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
    }
    $("#operatorsLoader").remove();
    showOperatorsCount();
    } else {
      showAlert ("msg","danger","Ha ocurrido un error");
    }
  });
}
function fillOperatorsList(i){
  $("#operatorsList").append("<tr id='operator"+i+"'><td>"+ operatorUsers[i].firstName +"</td><td>"+ operatorUsers[i].lastName +"</td><td>"+ operatorUsers[i].userName +"</td></tr>");
}
function clickRowEvent(i){
  $("tr#operator"+i).on("click",function(){
      $("#inputOperatorId").val(operatorUsers[i].id);
      $("#inputOperatorFirstName").val(operatorUsers[i].firstName);
      $("#inputOperatorLastName").val(operatorUsers[i].lastName);
      $("#inputOperatorUsername").val(operatorUsers[i].userName);
      $("#inputOperatorPassword").val(operatorUsers[i].userPassword);
      $("#inputOperatorPassword2").val(operatorUsers[i].userPassword);
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

// Operators Form Buttons
function resetOperatorsForm(){
    $("#operatorsForm input").val("");
}
function saveOperator(){
  $("#saveOperator").on("click",function(){
    var id = $.trim($("#inputOperatorId").val());
    var firstName = $.trim($("#inputOperatorFirstName").val());
    var lastName = $.trim($("#inputOperatorLastName").val());
    var userName = $.trim($("#inputOperatorUsername").val());
    var userPassword = $.trim($("#inputOperatorPassword").val());
    var userPassword2 = $.trim($("#inputOperatorPassword2").val());
    if (id=="") {
      var file = SERVER_URL+"/api/operatorUser/create?json={firstName:%22"+ firstName +"%22,lastName:%22"+ lastName +"%22, userName:%22"+ userName +"%22,userPassword:%22"+ userPassword +"%22,entityId:%22"+ entityIdUrl +"%22}";
      if (firstName !== "" && lastName !== "" && userName !== "" && userPassword !== "") {
        if (userPassword == userPassword2){
          $.getJSON(file, function(result){
            if(result.status=="ok"){
              showAlert ("msg","success","Operador creado con &eacute;xito");
              showOperators();
              resetOperatorsForm();
            } else {
              showAlert ("msg","danger","Ha ocurrido un error");
            }
          });
        } else {
          showAlert ("msg","danger","Las contrase&ntilde;as no coinciden");
        }
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
                      resetOperatorsForm();
                    } else {
                      showAlert ("msg","danger","Ha ocurrido un error");
                    }
                  });
                } else {
                  showAlert ("msg","danger","Seleccione un operador de la lista");
                }
});
}
// function validateInputs(){
//   var validation = true;
//   var firstName = $("#inputOperatorFirstName").val();
//   if (firstName == "") {
//     $("#inputOperatorFirstName").parent().addClass("has-error");
//     validation = false;
//   }
//   var lastName = $("#inputOperatorLastName").val();
//   if (lasttName == "") {
//     $("#inputOperatorLastName").parent().addClass("has-error");
//     validation = false;
//   }
//   var userName = $("#inputOperatorUsername").val();
//   if (usertName == "") {
//     $("#inputOperatorUserName").parent().addClass("has-error");
//     validation = false;
//   }
//   var userPassword = $("#inputOperatorPassword").val();
//   if (userPassword == "") {
//     $("#inputOperatorPassword").parent().addClass("has-error");
//     validation = false;
//   }
//   var userPassword2 = $("#inputOperatorPassword2").val();
//   if (userPassword2 == "") {
//     $("#inputOperatorPassword2").parent().addClass("has-error");
//     validation = false;

//   //$("#operatorsForm input").focus(function)

//     return validation;
//   }

// }
