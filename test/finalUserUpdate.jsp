<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Usuario final - Modificacion</title>
</head>
<body>
	<h1>Usuario final - Modificacion</h1>
 
	<form action="<%=request.getContextPath()%>/api/finalUser/update" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Actualizar" />
	</form>
 	<br/>
 	<br/>
 	{firstName:"juan",lastName:"moreno", entityId:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a", trackerId:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a", phones:"3512564819, 3543464124", notes:"notas", id:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a", dni:"22222222"}
 	
 	
</body>
</html>