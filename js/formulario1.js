// Validación de los campos de contacto

function validarContacto() {
    let errores = [];
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;

    const nombreRegex = /^[A-Za-z]{1,15}$/;
    const apellidosRegex = /^[A-Za-z\s]{1,40}$/;
    const telefonoRegex = /^[0-9]{9}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!nombreRegex.test(nombre)) {
        errores.push('El nombre debe contener solo letras y máximo 15 caracteres.');
    }

    if (!apellidosRegex.test(apellidos)) {
        errores.push('Los apellidos deben contener solo letras y espacios, y máximo 40 caracteres.');
    }

    if (!telefonoRegex.test(telefono)) {
        errores.push('El teléfono debe contener solo números y 9 dígitos.');
    }

    if (!emailRegex.test(email)) {
        errores.push('El correo electrónico no es válido.');
    }

    return errores;
}

// Validación del plazo

function validarPlazo() {
    let errores = [];
    const plazo = parseInt(document.getElementById('plazo').value);

    if (isNaN(plazo) || plazo <= 0) {
        errores.push('El plazo debe ser un número mayor a 0.');
    }

    return errores;
}

// Mostrar los errores en el cuadro de diálogo

function mostrarErrores(errores) {
    const errorBox = document.getElementById('errorBox');
    errorBox.innerHTML = errores.join('<br>');
    errorBox.style.display = 'block';
}

// Función para calcular el presupuesto

function calcularPresupuesto() {
    const producto = parseFloat(document.getElementById('producto').value);
    const plazo = parseInt(document.getElementById('plazo').value) || 1;
    const extra1 = document.getElementById('extra1').checked ? parseFloat(document.getElementById('extra1').value) : 0;
    const extra2 = document.getElementById('extra2').checked ? parseFloat(document.getElementById('extra2').value) : 0;
    const extra3 = document.getElementById('extra3').checked ? parseFloat(document.getElementById('extra3').value) : 0;

    let descuento = 0;

    // 30% de descuento para los primeros 3 meses
    if (plazo >= 1 && plazo <= 3) {
        descuento = 0.3;  // 30% de descuento si el plazo es entre 1 y 3 meses
    }

    // 25% de descuento para los siguientes 3 meses (4-6 meses)
    if (plazo >= 4 && plazo <= 6) {
        descuento = 0.25;  // 25% de descuento si el plazo es entre 4 y 6 meses
    }

    // 15% de descuento para los siguientes 5 meses (7-11 meses)
    if (plazo >= 7 && plazo <= 11) {
        descuento = 0.15;  // 15% de descuento si el plazo es entre 7 y 11 meses
    }

    // 10% de descuento para plazos de 12 meses o más
    if (plazo >= 12) {
        descuento = 0.1;  // 10% de descuento si el plazo es de 12 meses o más
    }

    const totalExtras = extra1 + extra2 + extra3;
    let presupuesto = producto + totalExtras;

    // Aplicar descuento sobre el presupuesto

    presupuesto -= presupuesto * descuento;

    document.getElementById('presupuestoFinal').value = presupuesto.toFixed(2) + '€';
}

// Función para enviar el formulario

function enviarFormulario() {
    // Limpiar cualquier error previo
    document.getElementById('errorBox').style.display = 'none';

    // Obtener los errores de la validación de contacto y plazo
    let errores = [];
    errores = errores.concat(validarContacto());  // Validación de los campos de contacto
    errores = errores.concat(validarPlazo());  // Validación del plazo

    // Si hay errores, mostrarlos y evitar el envío
    if (errores.length > 0) {
        mostrarErrores(errores);
        return; // Detener el envío del formulario si hay errores
    }

    // Verificar si se han aceptado las condiciones
    if (!document.getElementById('condiciones').checked) {
        alert('Debes aceptar las condiciones de privacidad.');
        return;
    }

    // Si todo está bien, mostrar mensaje y reiniciar el formulario
    alert('Formulario enviado correctamente!');
    document.getElementById('presupuestoForm').reset();
}
