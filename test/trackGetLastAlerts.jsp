<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Track - Ultimas alertas</title>
</head>
<body>
	<h1>Track - Ultimas lertas</h1>
 
	<form action="<%=request.getContextPath()%>/api/track/getLastAlerts" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Ultimas alertas" />
	</form>
 	<br/>
 	<br/>
 	{entityId:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a"}
 	
 	
</body>
</html>