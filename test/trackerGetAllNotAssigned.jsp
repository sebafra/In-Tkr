<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Tracker - Listar todos no asignados</title>
</head>
<body>
	<h1>Tracker - Listar todos no asignados</h1>
 
	<form action="<%=request.getContextPath()%>/api/tracker/getAllNotAssigned" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Listar los no asignados" />
	</form>
 	<br/>
 	<br/>
 	{entityId:"14a771f5-d48d-2fec-928e-10f811744962"}
 	
 	
</body>
</html>