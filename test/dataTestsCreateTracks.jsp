<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Datos de prueba - Crear tracks</title>
</head>
<body>
	<h1>Datos de prueba - Crear tracks</h1>
 
	<form action="<%=request.getContextPath()%>/api/dataTests/createTracks" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Crear" />
	</form>
 	<br/>
 	<br/>
 	{entityId:"1", trackerId:"1", quantity:1, type: 1}
  	<br/>
 	<br/>
 	TYPE (opcional, si no se define crea tipos aleatorios):
 	<br/>
 	PANICO: 1
 	<br/>
 	EMERGENCIA: 2 	
 	<br/>
 	CAIDA LIBRE: 3 		
 	
</body>
</html>