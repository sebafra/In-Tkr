<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Usuario - Modificacion</title>
</head>
<body>
	<h1>Usuario - Modificacion</h1>
 
	<form action="<%=request.getContextPath()%>/api/user/update" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Actualizar" />
	</form>
 	<br/>
 	<br/>
 	{name:"jmoreno",password:"jmoreno", type:"1", id:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a"}
 	<br/>
 	<br/>
 	TYPE:
 	<br/>
 	ADMINISTRATOR: 1
 	<br/>
 	OPERATOR_USER: 2
	<br/>
 	ENTITY: 3
	<br/>
 	FINAL_USER: 4 	
 	
 	
</body>
</html>