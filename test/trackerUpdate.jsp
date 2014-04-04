<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Tracker - Modificacion</title>
</head>
<body>
	<h1>Tracker - Modificacion</h1>
 
	<form action="<%=request.getContextPath()%>/api/tracker/update" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Actualizar" />
	</form>
 	<br/>
 	<br/>
 	{imei:"30dc20e5", ani:"30d", entityId:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a", type:1, id:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a", finalUserId : "30dc20e5-b2e9-6bc9-ac98-39f7637a798a"}
 	<br/>
 	<br/>
 	TYPE:
 	<br/>
 	CELLPHONE: 1
 	<br/>
 	TABLET: 2 	
 	
</body>
</html>