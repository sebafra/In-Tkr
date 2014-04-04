<jsp:include page="watchdog.jsp"></jsp:include>
<html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Usuario - Cambiar password</title>
</head>
<body>
	<h1>Usuario - Cambiar password</h1>
 
	<form action="<%=request.getContextPath()%>/api/user/updatePassword" method="get">
 
	   <p>
		Add json : <input type="text" name="json"  style="width: 400px"/>
	   </p>
 
	   <input type="submit" value="Cambiar password" />
	</form>
 	<br/>
 	<br/>
 	{type:"2", id:"920e2ec0-a73d-eed2-a850-c2629fe69339",oldPassword:"p",newPassword:"pp"} 
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