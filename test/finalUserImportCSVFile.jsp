<html>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Usuario final - Alta / Modificacion con Foto</title>
</head>
<body>
	<h1>Usuario final - Alta / Modificacion con Foto</h1>
 
	<form action="<%=request.getContextPath()%>/api/finalUser/importCSVFile" method="post" enctype="multipart/form-data">
 
	   <p>
		Select a picture : <input type="file" name="csvFile" size="45" />
	   </p>
	   <p>
		Add json : <input type="text" name="json" />
	   </p>
 
	   <input type="submit" value="Importar" />
	</form>
 	<br/>
 	<br/>
 	{entityId:"d8c27398-6c82-4aa0-5d22-e791a5148485"}
 	<br/>
 	<br/>
 	COLUMNAS DEL ARCHIVO: dni, firstName, lastname, phones (opcional)
 
</body>
</html>