<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Usuario - Eliminar</title>
</head>
<body>
	<h1>Usuario - Eliminar</h1>
 
	<form action="<%=request.getContextPath()%>/api/user/remove" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Eliminar" />
	</form>
 	<br/>
 	<br/>
 	{id:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a"}
 	
 	
</body>
</html>