<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Usuario final - Alta / Modificacion con Foto</title>
</head>
<body>
	<h1>Usuario final - Alta / Modificacion con Foto</h1>
 
	<form action="<%=request.getContextPath()%>/api/finalUser/saveWithPicture" method="post" enctype="multipart/form-data">
 
	   <p>
		Select a picture : <input type="file" name="picture" size="45" />
	   </p>
	   <p>
		Add json : <input type="text" name="json" />
	   </p>
 
	   <input type="submit" value="Create" />
	</form>
 
 	<br/>
 	{firstName:"juan",lastName:"moreno", entityId:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a", trackerId:"30dc20e5-b2e9-6bc9-ac98-39f7637a798a", email:"juan@mail.com",phones:"3512564819, 3543464124", notes:"notas", dni:"22222222", id:"1111111"}
 
</body>
</html>