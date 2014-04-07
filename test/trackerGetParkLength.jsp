<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Tracker - Reporte - Parque - Length</title>
</head>
<body>
	<h1>Tracker - Reporte - Parque - Length</h1>
 
	<form action="<%=request.getContextPath()%>/api/tracker/getParkLength" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Reporte - Parque - Tamaño" />
	</form>
 	<br/>
 	<br/>
 	{entityId:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a", finalUserFirstName:"juan",finalUserLastName:"moreno",finalUserDni:"22222",imei:"222222"}
 	<br/>
 	<br/>
 	REQUERIDO: entityId

 	
 	
 	
</body>
</html>