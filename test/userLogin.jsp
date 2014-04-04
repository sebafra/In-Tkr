<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Usuario - Login</title>
</head>
<body>
	<h1>Usuario - Login</h1>
 
	<form action="<%=request.getContextPath()%>/api/user/login" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Login" />
	</form>
 	<br/>
 	<br/>
 	{name:"jmoreno",password:"jmoreno", type:"2"}
 	<br/>
 	<br/>
 	TYPE:
 	<br/>
 	OPERATOR_USER: 2
	<br/>
 	ENTITY: 3
	<br/>
 	FINAL_USER: 4 	
 	
</body>
</html>