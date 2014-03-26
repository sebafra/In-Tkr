$(document).ready(function () {
  showTopAlerts();
});

function showTopAlerts() {
  var alertsFile = "json/top-trackers.jsp?json={id:%221%22,type:%221%22}";
  $.getJSON(alertsFile, function(msg) {
    if(msg.status=="ok"){
      userId=msg.data.trackers[1].id;
      alert(userId);
      for (var i = 0, len = msg.length; i < len; i++) {
        //$("#lastAlerts").html("<tr><td>"+ msg.data.trackers[i].number +"</td><td>25-12 10:25</td><td>Juan Acosta</td></tr>");
        //alert("Hola");
        alert(userId);
}
                } else {
                  alert (msg.error.message);
                }
              });
}