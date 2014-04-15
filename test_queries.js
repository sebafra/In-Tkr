                var file = SERVER_URL+"/api/operatorUser/create?json={firstName:"+ firstName +",lastName:"+ lastName +", userName:"+ userName +",password:"+ password +",entityId:"+ entityId +"}";
                $.getJSON(file, function(result){
                  if(result.status=="ok"){
                    $('#msg').addClass("alert alert-success");
                    $('#msg').html("Operador creado con &eacute;xito");
                    $('#msg').slideDown("fast");
                  }
                });


                {imei:"30dc20e5", ani:"30dc20e5", entityId:"32b223c1-3e8e-0f85-d498-edb5d52569c2", type:1, finalUserId : "8c1937fb-0bb8-0ea8-e54a-33baf2089900"}

                {entityId:"32b223c1-3e8e-0f85-d498-edb5d52569c2"}

                //Alta de Usuarios

                {firstName:"Juan",lastName:"Perez", userName:"juan", userPassword:"perez", entityId:"32b223c1-3e8e-0f85-d498-edb5d52569c2", trackerId:"129a86a1-257c-bd6a-966f-dcc443882365", email:"juan@mail.com",phones:"35125648194", notes:"notas", dni:"2226854"}

                // Crear Track e1
                {entityId:"cb256ada-46ed-228a-f9f5-ac1ffeeda59b", trackerId:"6ce9f558-2a70-b991-0684-df3961fc88b3", latitude:"-34.58597", longitude:"-058.47377", timestamp:1397241322000, type:1}

                https://maps.googleapis.com/maps/api/geocode/json?latlng=-34.58597,-58.47377&AIzaSyCLrK2IeysyliNYn655pINuagMXLqRNVjU&sensor=false


