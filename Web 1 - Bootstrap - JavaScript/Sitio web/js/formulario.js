/*Formulario - Validación*/
function validar(event){
    let ok = 'si';
    let letras = /^[a-zA-Z ]+$/;
    let móvil = /^(6|7|8|9)[0-9]{8}$/;
    let correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let msj = '';
  
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const teléfono = document.getElementById("teléfono").value;
    const email = document.getElementById("email").value;
    //Validamos Nombre
    if(nombre == ''){
        ok = 'no',
        msj = msj + 'El campo "Nombre" no puede estar vacío. \n'
    }else{
        if(!letras.test(nombre)){
            ok = 'no',
            msj = msj + 'El campo "Nombre" no puede contener números. \n'
        }
    }
    //Validamos Apellidos
    if(apellidos == ''){
        ok = 'no',
        msj = msj + 'El campo "Apellidos" no puede estar vacío. \n'
    }else{
        if(!letras.test(apellidos)){
            ok = 'no',
            msj = msj + 'El campo "Apellidos" no puede contener números. \n'
        }
    }
    //Validamos Teléfono
    if(teléfono == ''){
        ok = 'no',
        msj = msj + 'El campo "Teléfono" no puede estar vacío. \n'
    }else{
        if(!móvil.test(teléfono)){
            ok = 'no'
            msj = msj + 'El campo "Teléfono" no puede contener letras. \n'
        }
    }
    //Validamos Email
    if(email == ''){
        ok = 'no'
        msj = msj + 'El campo "Email" no puede estar vacío. \n'
    }else{
        if(!correo.test(email)){
            ok = 'no'
            msj = msj + 'El campo "Email" es erróneo. \n'
        }
    }
    //Validamos aceptación de privacidad
    if(!$('#condiciones').is(':checked')){
        ok = 'no'
        msj = msj + 'Debe aceptar las condiciones de privacidad para poder enviar el formulario. \n'
    }
    //Finalizamos la validación
    if(ok == 'si'){
        alert('El formulario fue enviado con éxito.')
    }else{
        alert(msj)
        return false
    }
}

/*Formulario - Actualizar precio*/
$(document).ready(function(){
    var producto = $('#producto')
    var plazo = $('#plazo')
    var extra = $('input[class="form-check-input extra"]')
    var precioFinal = $('#presupuesto')
  
    function actualizarPrecio(){
      //Obtenemos precio base del producto seleccionado
      let precioBase = producto.val()
      //Calculamos descuento en función de los días
      let descuento = 0
      if(plazo.val() >= 15 && plazo.val()<=30){
        descuento = 10
      } else if(plazo.val() > 45){
        descuento = 20
      }
      //Añadimos extras si corresponde
      let precioExtra = 0
      extra.each(function(){
        if(this.checked){
          precioExtra += Number($(this).val())
        }
      })
      //Calculamos el precio final con descuentos
      let precioFinalCalculado = precioBase - (precioBase * descuento / 100) + precioExtra
      //Mostramos precio final
      precioFinal.text(precioFinalCalculado)
    }
  
    producto.on('change', actualizarPrecio)
    plazo.on('change', actualizarPrecio)
    extra.on('change', actualizarPrecio)
})