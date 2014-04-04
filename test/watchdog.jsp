<%

if(request.getParameter("u") == null || 
   request.getParameter("p") == null){
	RequestDispatcher rd = request.getRequestDispatcher(request.getContextPath() + "/index.html" );
	rd.forward(request, response);			
}else if(!request.getParameter("u").equals("intraway")){
	RequestDispatcher rd = request.getRequestDispatcher(request.getContextPath() + "/index.html" );
	rd.forward(request, response);			
}else if(!request.getParameter("p").equals("trackers")){
	RequestDispatcher rd = request.getRequestDispatcher(request.getContextPath() + "/index.html" );
	rd.forward(request, response);			
}

%>
