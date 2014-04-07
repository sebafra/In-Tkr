<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Datos de prueba - Crear trackers</title>
</head>
<body>
	<h1>Datos de prueba - Crear trackers</h1>
 
	<form action="<%=request.getContextPath()%>/api/dataTests/createTrackers" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Crear" />
	</form>
 	<br/>
 	<br/>
 	{entityId:"1", quantity:1}
 	
 	
</body>
</html>