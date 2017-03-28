 $(document).ready(function () {
   

      //gère le form pour update
     $(document).on('click','.formUpdate',function(e){ 
         parent = $(this).parents('form:first').serializeArray();
         
          $(this).parents('form:first').css('background-color','lightgreen');
          console.log(this);
        //empêche la page d'actualiser
        e.preventDefault(); 
         data = { 
         "nom" : parent[0].value,
         "prenom" : parent[1].value,
         "telephone" : parent[2].value,
        "_id" : parent[3].value,
        }
        sData = JSON.stringify(data);
        $.ajax({
            type:"post",
            url:"/update",
            dataType: 'json',
                //envoies les informations au serveur
                data: sData,
                contentType: 'application/json',
                complete: function(data){
                    console.log("réussite!");
            },
            error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus); //error logging
    }
        });
        }); 



     
     //gère le form pour delete
     $(document).on('click','.formDelete',function(e){ 
         parent = $(this).parents('form:first').serializeArray();
        
        //empêche la page d'actualiser
        e.preventDefault(); 
        //supprime ce qu'on a cliqué
        $(this).parents('form:first').remove();
        data = { 
         "nom" : parent[0].value,
         "prenom" : parent[1].value,
         "telephone" : parent[2].value,
        "_id" : parent[3].value,
        }
        sData = JSON.stringify(data);
        console.log(sData);
            $.ajax({
                type:"post",
                url:"/delete",
                dataType: 'json',
                    //envoie les infos au serveur
                //convertir à la main roro !!
                    //data: JSON.stringify($(this).parents('form:first').serializeArray()),
                data:sData,
                    contentType: 'application/json',
                    success: function(data){
                        console.log("réussite!");
                }});
        }); 

});