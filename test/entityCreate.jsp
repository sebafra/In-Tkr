<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Entidad - Alta</title>
</head>
<body>
	<h1>Entidad - Alta</h1>
 
	<form action="<%=request.getContextPath()%>/api/entity/create" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Crear" />
	</form>
 	<br/>
 	<br/>
 	{name:"entidad1", userName:"u", userPassword:"p"}
 	
 	
</body>
</html>