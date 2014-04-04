<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Tracker - Alta</title>
</head>
<body>
	<h1>Tracker - Alta</h1>
 
	<form action="<%=request.getContextPath()%>/api/tracker/create" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Crear" />
	</form>
 	<br/>
 	<br/>
 	{imei:"30dc20e5", ani:"30dc20e5", entityId:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a", type:1, finalUserId : "30dc20e5-b2e9-6bc9-ac98-39f7637a798a"}
 	<br/>
 	<br/>
 	TYPE:
 	<br/>
 	CELLPHONE: 1
 	<br/>
 	TABLET: 2 	
 	
</body>
</html>