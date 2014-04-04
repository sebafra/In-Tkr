<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Tracker - Resumen de estado</title>
</head>
<body>
	<h1>Tracker - Resumen de estado</h1>
 
	<form action="<%=request.getContextPath()%>/api/tracker/getStatusSummary" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Resumen de estado" />
	</form>
 	<br/>
 	<br/>
 	{entityId:"14a771f5-d48d-2fec-928e-10f811744962"}
 	
 	
</body>
</html>