<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Usuario - Listar todos</title>
</head>
<body>
	<h1>Usuario - Listar todos</h1>
 
	<form action="<%=request.getContextPath()%>/api/user/getAll" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Listar" />
	</form>
 	<br/>
 	<br/>
 	{}
 	
 	
</body>
</html>