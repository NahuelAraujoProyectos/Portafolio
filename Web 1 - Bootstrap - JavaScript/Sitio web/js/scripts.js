$(document).ready(function(){

    //Función para obtener datos de JSON
    function llamadaAjax(filtro){
        $.ajax({
            url: '../js/proyectos.json',
            method: 'GET',
            dataType: 'json',
            success:function(response){
                //Guardamos la respuesta en una variable
                let respuesta = response.cards

                //Limpiamos el contenedor
                $('.grupo-proyectos').empty()

                //Realizamos una iteración en la respuesta para generar las tarjetas
                respuesta.forEach(proyecto => {

                    //Evaluamos el filtro elegido
                    if(proyecto['categoria']==filtro || filtro=='Todos'){
                        let tarjetas = '<div class="card-proyectos">'
                        tarjetas += '<div class="imagen">'
                        tarjetas += `<a href="/images/${proyecto['imagen']}" data-lightbox="image-1" data-title="${proyecto['titulo']} ">`
                        tarjetas += `<img src="/images/${proyecto['imagen']}" alt="" class="img">`
                        tarjetas += '</a>'
                        tarjetas += '</div>'
                        tarjetas += '<div class="descripcion">'
                        tarjetas += `<h6>${proyecto['titulo']}</h6>`
                        tarjetas += `<p>${proyecto['texto']}</p>`
                        tarjetas += '</div>'
                        tarjetas += '</div>'

                        //Añadimos la tarjeta
                        $('.grupo-proyectos').append(tarjetas);
                    }
                    
                });

            },
            error: function(){
                alert('no funciona')
            }
        })
    }





    //Al iniciar tenemos una primer llamada
    llamadaAjax('Todos')

    //Comportamiento de botones
    $("#btn-todos").on("click",function(){
        let filtro = $("#btn-todos").html();
        llamadaAjax(filtro)
    })

    $("#btn-comercial").on("click",function(){
        let filtro = $("#btn-comercial").html();
        llamadaAjax(filtro)
    })

    $("#btn-residencial").on("click",function(){
        let filtro = $("#btn-residencial").html();
        llamadaAjax(filtro)
    })

    $("#btn-otros").on("click",function(){
        let filtro = $("#btn-otros").html();
        llamadaAjax(filtro)
    })
})