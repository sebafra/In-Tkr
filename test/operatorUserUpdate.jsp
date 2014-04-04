<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Usuario operador - Modificacion</title>
</head>
<body>
	<h1>Usuario operador - Modificacion</h1>
 
	<form action="<%=request.getContextPath()%>/api/operatorUser/update" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Actualizar" />
	</form>
 	<br/>
 	<br/>
 	{firstName:"juan",lastName:"moreno", userName:"u", userPassword:"p",  entityId:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a", id:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a"}
 	
 	
</body>
</html>