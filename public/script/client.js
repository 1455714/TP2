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
     
//gère le form pour ajouter
$('#ajout').on('submit', function(e) {
    //empêche la page d'actualiser
    e.preventDefault(); 
    
    console.log(this);
        $.ajax({
            type:"post",
            url:"/ajout",
            dataType: 'json',
                //envoie les infos au serveur
                data: JSON.stringify($(this).serializeArray()),
                contentType: 'application/json',
                complete: function(data){
                    console.log(data.responseText);
                    //ajoute qqch
                   /* elm = document.createElement('form');
                    elm.setAttribute("class","table-row");
                    elm.setAttribute("action","/update");
                    elm.setAttribute("method","POST");
                     $('.container-fluid').append(elm);
                     $('.container-fluid form:last-child').append('<input type="text" class="text" name="nom" value="Nom"></input><input type="text" class="text" name="prenom" value="Prenom"></input><input type="text" class="text" name="telephone" value="Téléphone"></input><input type="text" class="text" value='+data.responseText+'></input><div class="text"><button type="submit" class="formUpdate">change</button></div><input type="hidden" name="_id"  value='+data.responseText+'><div class="text"><button type="submit" formaction="/delete" class="formDelete">x</button></div>')*/
                    
    $('.container-fluid').append('<form class="table-row " action ="/update" method="POST"><input type="text" class="text" name="nom" value="Nom"></input><input type="text" class="text" name="prenom" value="Prenom"></input><input type="text" class="text" name="telephone" value="Téléphone"></input><input type="text" class="text" value='+data.responseText+'></input><div class="text"><button type="submit" class="formUpdate">change</button></div><input type="hidden" name="_id"  value='+data.responseText+'><div class="text"><button type="submit" formaction="/delete" class="formDelete">x</button></div></form>')
            $('.container-fluid form:last-child').css('background-color','lightyellow');
                }
        });
    });
});
