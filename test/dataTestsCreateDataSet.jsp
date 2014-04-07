<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Datos de prueba - Crear data set</title>
</head>
<body>
	<h1>Datos de prueba - Crear data set</h1>
 
	<form action="<%=request.getContextPath()%>/api/dataTests/createDataSet" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Crear" />
	</form>
 	<br/>
 	<br/>
 	{entityName:"e1", entityUserName:"e1", entityUserPassword:"e1", finalUserQuantity:10, trackQuantity: 100}
 	<br/>
 	<br/>
	Los quantity son opcionales	
 	
</body>
</html>