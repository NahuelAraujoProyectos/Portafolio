$(document).ready(function(){
    //Función para ver las noticias
    function ver_noticias(){
        $.ajax({
            type: 'POST',
            url: '../../controllers/noticia/noticia_recuperar.php',
            dataType: 'json',
            success: function(response){
                let noticias = response['noticias'];
                let n_noticias = noticias.length;
                for(i=0;i<n_noticias;i++){
                    let tituloNoticia = noticias[i]['título'];
                    let imagenNoticia = noticias[i]['imagen'];
                    let textoNoticia = noticias[i]['texto'];
                    let fechaNoticia = noticias[i]['fecha'];
                    let autor = noticias[i]['usuario'];

                    //Verificamos si el estado está definido
                    if(typeof noticias[i]['estado'] !== 'undefined'){
                        var estado = ' - ('+noticias[i]['estado']+')';
                    }else{
                        var estado = '';
                    }
                    
                    // Dividimos la fecha en año, mes y día
                    let fechaOriginal = fechaNoticia;
                    let partesFecha = fechaOriginal.split('-');
                    let año = partesFecha[0];
                    let mes = partesFecha[1];
                    let dia = partesFecha[2];

                    // Creamos la nueva fecha en el formato deseado (dd-mm-yyyy)
                    let fechaFormateada = dia + "-" + mes + "-" + año;

                    let noticia_recuperada = '<div class="card mb-3 w-50 mx-auto">';
                    noticia_recuperada += '<div class="card-body">';
                    noticia_recuperada += '<h3 class="card-title text-capitalize">'+tituloNoticia+estado+'</h3>';
                    noticia_recuperada += '<hr>';
                    noticia_recuperada += '<div id="div_imagen" class="mb-3 d-flex justify-content-center">';
                    noticia_recuperada += '<img class="card-img img-fluid" src="../../img/noticias/'+imagenNoticia+'" alt="'+tituloNoticia+'">';
                    noticia_recuperada += '</div>';
                    noticia_recuperada += '<div id="div_texto" class="mb-3">';
                    noticia_recuperada += '<p class="card-text">'+textoNoticia+'</p>';
                    noticia_recuperada += '</div>';
                    noticia_recuperada += '<div class="card-footer">';
                    noticia_recuperada += '<div class="row">';
                    noticia_recuperada += '<div class="col-md-6" id="autor">';
                    noticia_recuperada += '<p class="card-text my-1 text-start"><strong>Autor: '+autor+'</strong></p>';
                    noticia_recuperada += '</div>';                    
                    noticia_recuperada += '<div class="col-md-6" id="fecha">';
                    noticia_recuperada += '<p class="card-subtitle my-1 text-muted text-start text-md-end">'+fechaFormateada+'</p>';
                    noticia_recuperada += '</div>';                    
                    noticia_recuperada += '</div>';                    
                    noticia_recuperada += '</div>';
                    noticia_recuperada += '</div>';                
                    noticia_recuperada += '</div>';

                    $('#ver_noticias').append(noticia_recuperada)                    
                }
            },
            error: function(){
                let m_error = '<div class="alert alert-danger" role="alert"><p class="text-center my-1">Error al cargar las noticias.<br>Revisar conexión con base de datos.</p></div>'
                $('#respuesta').append(m_error);
            }
        })
    }
    
    //Presentamos las noticias
    ver_noticias()
})