<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Tracker - Reporte - Seguimiento</title>
</head>
<body>
	<h1>Tracker - Reporte - Seguimiento</h1>
 
	<form action="<%=request.getContextPath()%>/api/track/getTracing" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Reporte - Seguimiento" />
	</form>
 	<br/>
 	<br/>
 	{entityId:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a", finalUserFirstName:"juan",finalUserLastName:"moreno",finalUserDni:"22222",trackerImei:"wwwwwww", type:2, dateStart:0, dateEnd:1000000000000, page:1}
 	<br/>
 	REQUERIDO: entityId
 	
</body>
</html>