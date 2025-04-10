// Función para calcular el presupuesto
function calcularPresupuesto() {
    const productoSelect = document.getElementById('producto');
    const producto = parseFloat(productoSelect.value);  // Producto seleccionado
    const plazo = document.getElementById('plazo').value;  // Plazo de entrega en meses
    const extra1 = document.getElementById('extra1').checked ? parseFloat(document.getElementById('extra1').value) : 0;
    const extra2 = document.getElementById('extra2').checked ? parseFloat(document.getElementById('extra2').value) : 0;
    const extra3 = document.getElementById('extra3').checked ? parseFloat(document.getElementById('extra3').value) : 0;

    // Validar que el producto ha sido seleccionado
    if (!producto) {
        alert("Por favor, selecciona un producto.");
        return;
    }

    // Sumar el total de extras seleccionados
    const totalExtras = extra1 + extra2 + extra3;

    // El presupuesto inicial es la suma del precio del producto y los extras
    let presupuesto = producto + totalExtras;

    // Descuento solo si el plazo es válido (número positivo)
    let descuento = 0;

    // Verificar si el campo plazo tiene un valor válido
    if (plazo === "" || isNaN(plazo) || plazo <= 0) {
        // Si el plazo está vacío o no es un valor numérico válido, no se aplica descuento
        descuento = 0;
    } else {
        // Convertir el plazo a número entero para evitar posibles decimales
        const plazoNum = parseInt(plazo);

        // Aplicar descuento según el valor del plazo
        if (plazoNum >= 1 && plazoNum <= 3) {
            descuento = 0.3;  // 30% de descuento si el plazo es entre 1 y 3 meses
        } else if (plazoNum >= 4 && plazoNum <= 6) {
            descuento = 0.25; // 25% de descuento si el plazo es entre 4 y 6 meses
        } else if (plazoNum >= 7 && plazoNum <= 11) {
            descuento = 0.15; // 15% de descuento si el plazo es entre 7 y 11 meses
        } else if (plazoNum >= 12) {
            descuento = 0.1;  // 10% de descuento si el plazo es de 12 meses o más
        }
    }

    // Aplicar el descuento (si corresponde)
    presupuesto -= presupuesto * descuento;

    // Mostrar el presupuesto final con dos decimales
    document.getElementById('presupuestoFinal').value = presupuesto.toFixed(2) + '€';
}

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

// Evento de cambio en el producto
document.getElementById('producto').addEventListener('change', calcularPresupuesto);

// Evento de cambio en el plazo
document.getElementById('plazo').addEventListener('input', calcularPresupuesto);

// Evento de cambio en los extras
document.getElementById('extra1').addEventListener('change', calcularPresupuesto);
document.getElementById('extra2').addEventListener('change', calcularPresupuesto);
document.getElementById('extra3').addEventListener('change', calcularPresupuesto);

// Evento de envío del formulario
document.getElementById('presupuestoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
    enviarFormulario();
});
