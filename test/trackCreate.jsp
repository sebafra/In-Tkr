<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Track - Alta</title>
</head>
<body>
	<h1>Track - Alta</h1>
 
	<form action="<%=request.getContextPath()%>/api/track/create" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Crear" />
	</form>
 	<br/>
 	<br/>
 	{entityId:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a", trackerId:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a", latitude:"1.23233", longitude:"1.23233", timestamp:234523233, type:1}
 	<br/>
 	<br/>
 	TYPE:
 	<br/>
 	PANICO: 1
 	<br/>
 	EMERGENCIA: 2 	
 	<br/>
 	CAIDA LIBRE: 3 	
 	
</body>
</html>