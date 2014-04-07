<jsp:include page="watchdog.jsp"></jsp:include> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Consorcio movil</title>
</head>

<body>

	<h2>User</h2>
	<table border="1">
<!-- <tr>
			<td><a href="userCreate.jsp?u=intraway&p=trackers">Alta</a></td>
		</tr>
		<tr>
			<td><a href="userUpdate.jsp?u=intraway&p=trackers">Modificacion</a></td>
		</tr>
		<tr>
			<td><a href="userRemove.jsp?u=intraway&p=trackers">Baja</a></td>
		</tr>
		<tr>
			<td><a href="userGetAll.jsp?u=intraway&p=trackers">Listar todos</a></td>
		</tr>-->
		<tr>
			<td><a href="userLogin.jsp?u=intraway&p=trackers">Login</a></td>
		</tr>
		<tr>
			<td><a href="userUpdatePassword.jsp?u=intraway&p=trackers">Cambio password</a></td>
		</tr>
	</table>


	<h2>Entidad</h2>
	<table border="1">
		<tr>
			<td><a href="entityCreate.jsp?u=intraway&p=trackers">Alta</a></td>
		</tr>
		<tr>
			<td><a href="entityUpdate.jsp?u=intraway&p=trackers">Modificacion</a></td>
		</tr>
		<tr>
			<td><a href="entityRemove.jsp?u=intraway&p=trackers">Baja</a></td>
		</tr>
		<tr>
			<td><a href="entityGetAll.jsp?u=intraway&p=trackers">Listar todos</a></td>
		</tr>
	</table>


	<h2>Usuario final</h2>
	<table border="1">
<!--		<tr>
			<td><a href="finalUserCreate.jsp?u=intraway&p=trackers">Alta</a></td>
		</tr>
		<tr>
			<td><a href="finalUserCreateWithPicture.jsp?u=intraway&p=trackers">Alta con foto</a></td>
		</tr>
		<tr>
			<td><a href="finalUserUpdate.jsp?u=intraway&p=trackers">Modificacion</a></td>
		</tr>-->
		<tr>
			<td><a href="finalUserSaveWithPicture.jsp?u=intraway&p=trackers">Alta/Modificacion con foto</a></td>
		</tr>
		<tr>
			<td><a href="finalUserRemove.jsp?u=intraway&p=trackers">Baja</a></td>
		</tr>
		<tr>
			<td><a href="finalUserGetAll.jsp?u=intraway&p=trackers">Listar todos</a></td>
		</tr>
		<tr>
			<td><a href="finalUserImportCSVFile.jsp?u=intraway&p=trackers">Importar CSV file</a></td>
		</tr>

	</table>


	<h2>Usuario operador</h2>
	<table border="1">
		<tr>
			<td><a href="operatorUserCreate.jsp?u=intraway&p=trackers">Alta</a></td>
		</tr>
		<tr>
			<td><a href="operatorUserUpdate.jsp?u=intraway&p=trackers">Modificacion</a></td>
		</tr>
		<tr>
			<td><a href="operatorUserRemove.jsp?u=intraway&p=trackers">Baja</a></td>
		</tr>
		<tr>
			<td><a href="operatorUserGetAll.jsp?u=intraway&p=trackers">Listar todos</a></td>
		</tr>
	</table>


	<h2>Tracker</h2>
	<table border="1">
		<tr>
			<td><a href="trackerCreate.jsp?u=intraway&p=trackers">Alta</a></td>
		</tr>
		<tr>
			<td><a href="trackerUpdate.jsp?u=intraway&p=trackers">Modificacion</a></td>
		</tr>
		<tr>
			<td><a href="trackerRemove.jsp?u=intraway&p=trackers">Baja</a></td>
		</tr>
		<tr>
			<td><a href="trackerGetAll.jsp?u=intraway&p=trackers">Listar todos</a></td>
		</tr>
		<tr>
			<td><a href="trackerGetAllNotAssigned.jsp?u=intraway&p=trackers">Listar todos los no asignados</a></td>
		</tr>
		<tr>
			<td><a href="trackerGetUnreported.jsp?u=intraway&p=trackers">No reportan</a></td>
		</tr>
		<tr>
			<td><a href="trackerGetStatusSummary.jsp?u=intraway&p=trackers">Resumen de estado</a></td>
		</tr>
		<tr>
			<td><a href="trackerGetPark.jsp?u=intraway&p=trackers">Reporte - Parque</a></td>
		</tr>
		<tr>
			<td><a href="trackerGetParkExport.jsp?u=intraway&p=trackers">Reporting - Parque - Export</a></td>
		</tr>
		<tr>
			<td><a href="trackerGetParkLength.jsp?u=intraway&p=trackers">Reporting - Parque - Length</a></td>
		</tr>
		
	</table>


	<h2>Track</h2>
	<table border="1">
		<tr>
			<td><a href="trackCreate.jsp?u=intraway&p=trackers">Alta</a></td>
		</tr>
		<tr>
			<td><a href="trackUpdate.jsp?u=intraway&p=trackers">Modificacion</a></td>
		</tr>
		<tr>
			<td><a href="trackRemove.jsp?u=intraway&p=trackers">Baja</a></td>
		</tr>
		<tr>
			<td><a href="trackGetAll.jsp?u=intraway&p=trackers">Listar todos</a></td>
		</tr>
		<tr>
			<td><a href="trackGetLastAlerts.jsp?u=intraway&p=trackers">Ultimas alertas</a></td>
		</tr>
		<tr>
			<td><a href="trackGetTracing.jsp?u=intraway&p=trackers">Reporte - Seguimiento de tracks</a></td>
		</tr>
		<tr>
			<td><a href="trackGetTracingExport.jsp?u=intraway&p=trackers">Reporte - Seguimiento de tracks - Export</a></td>
		</tr>
		<tr>
			<td><a href="trackGetTracingLength.jsp?u=intraway&p=trackers">Reporte - Seguimiento de tracks - Length</a></td>
		</tr>
	</table>


</body>
</html>