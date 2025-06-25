// Funciones para el formulario de contacto y contador de caracteres.

document.addEventListener('DOMContentLoaded', function() {  // Asegurarse de que el DOM esté completamente cargado antes de ejecutar el código
    // --- CONTADOR DE CARACTERES ---
    const mensaje = document.getElementById('mensaje');  // Asegurarse de que el elemento exista
    const contador = document.getElementById('contador-caracteres');  // Asegurarse de que el elemento exista
    const max = mensaje ? mensaje.getAttribute('maxlength') : 300;  // Valor por defecto si no se encuentra el elemento

    if (mensaje && contador) {  // Verificar que ambos elementos existan
        mensaje.addEventListener('input', function() {  // Escuchar el evento de entrada en el campo de mensaje
            contador.textContent = `${mensaje.value.length} / ${max}`;  // Actualizar el contador de caracteres
        });
    }

    // --- VALIDACIONES DEL FORMULARIO ---
    const form = document.getElementById('formularioContacto');  // Asegurarse de que el formulario exista
    const msjFormulario = document.getElementById('msj-formulario');  // Asegurarse de que el mensaje del formulario exista

    if (form) {  // Verificar que el formulario exista
        form.addEventListener('submit', function(e) {  // Escuchar el evento de envío del formulario
            e.preventDefault();  // Prevenir el envío del formulario para realizar validaciones

            // Limpiar mensajes anteriores
            msjFormulario.innerHTML = "";

            // Acumular errores
            let errores = [];

            // 1. Validar que todos los campos estén completos
            const nombre = document.getElementById('nombre').value.trim();  // Asegurarse de que el elemento exista
            const apellido = document.getElementById('apellido').value.trim();  // Asegurarse de que el elemento exista
            const email = document.getElementById('email').value.trim();  // Asegurarse de que el elemento exista
            const mensajeValor = mensaje.value.trim();  // Asegurarse de que el elemento exista

            if (!nombre) errores.push('Por favor, completa el campo Nombre.');  // Verificar si el campo nombre está vacío
            if (!apellido) errores.push('Por favor, completa el campo Apellido.');  // Verificar si el campo apellido está vacío
            if (!email) errores.push('Por favor, completa el campo Email.');  // Verificar si el campo email está vacío
            if (!mensajeValor) errores.push('Por favor, completa el campo Mensaje.');  // Verificar si el campo mensaje está vacío

            // 2. Validar que el nombre y apellido solo contengan letras y espacios
            const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;  // Expresión regular para letras y espacios
            if (nombre && !soloLetras.test(nombre)) errores.push('El nombre solo debe contener letras y espacios.');  // Verificar si el nombre no cumple con la expresión regular
            if (apellido && !soloLetras.test(apellido)) errores.push('El apellido solo debe contener letras y espacios.');  // Verificar si el apellido no cumple con la expresión regular

            // 3. Validar formato de email
            const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;  // Expresión regular para validar el formato del email
            if (email && !emailRegex.test(email)) errores.push('Por favor, ingresa un correo electrónico válido.');  // Verificar si el email no cumple con la expresión regular

            // 4. Validar longitud mínima del mensaje
            if (mensajeValor && mensajeValor.length < 10) errores.push('El mensaje debe tener al menos 10 caracteres.');  // Verificar si el mensaje tiene menos de 10 caracteres

            // 5. Validar que el mensaje no contenga solo espacios o caracteres repetidos
            if (mensajeValor && /^(\s|\S)\1*$/.test(mensajeValor)) errores.push('El mensaje no puede ser solo espacios o caracteres repetidos.');

            // Mostrar errores o éxito
            const seccionFormulario = document.querySelector('.formulario-contacto');  // Asegurarse de que la sección del formulario exista
            if (errores.length > 0) {  // Si hay errores, mostrarlos
                msjFormulario.innerHTML = errores.map(e => `<div class="mensaje-error">${e}</div>`).join('');  // Mostrar todos los errores juntos
            } else {  // Si no hay errores, mostrar mensaje de éxito
                msjFormulario.innerHTML = '<div class="mensaje-exito">Formulario enviado correctamente!</div>';  // Mostrar mensaje de éxito
                form.reset();  // Limpiar el formulario después de enviar
                contador.textContent = `0 / ${max}`;  // Reiniciar el contador de caracteres
                seccionFormulario.classList.remove('error');  // Eliminar clase de error si estaba presente
                seccionFormulario.classList.add('exito');  // Agregar clase de éxito
            }
        });
    }
});

// Funciones para manejar los botones de favoritos

function mostrarAlertaFavoritos(mensaje) {  // Muestra una alerta temporal en la sección de favoritos
    const alerta = document.getElementById('alerta-favoritos');  // Asegurarse de que el elemento exista
    alerta.textContent = mensaje;  // Asignar el mensaje a la alerta
    alerta.classList.add('alerta-favoritos-activa');  // Agregar clase para mostrar la alerta
    setTimeout(() => {  // Ocultar la alerta después de 1.8 segundos
        alerta.classList.remove('alerta-favoritos-activa');  // Eliminar clase para ocultar la alerta
    }, 1800);  // Esperar 1800 milisegundos = 1.8 segundos antes de ocultar la alerta
}

document.querySelectorAll('.btn-favorito').forEach(btn => {  // Seleccionar todos los botones de favoritos
    btn.addEventListener('click', function() {  // Agregar evento de clic a cada botón
        const seccion = this.getAttribute('data-section');  // Obtener la sección del botón clicado
        const lista = document.getElementById('favoritos-lista');  // Asegurarse de que la lista de favoritos exista
        // Evitar duplicados
        if (![...lista.children].some(li => li.textContent === seccion)) {  // Verificar si la sección ya está en la lista
            const li = document.createElement('li');  // Crear un nuevo elemento de lista
            li.textContent = seccion;  // Asignar el texto de la sección al elemento de lista
            lista.appendChild(li);  // Agregar el elemento de lista a la lista de favoritos
            mostrarAlertaFavoritos('¡Interés agregado a la lista!');  // Mostrar alerta de éxito
        } else {  // Si la sección ya está en la lista, mostrar alerta de duplicado
            mostrarAlertaFavoritos('¡Ese interés ya está en tu lista!');  // Mostrar alerta de duplicado
        }
    });
});


// ¿Qué hace este código?

// Junta todos los errores en un array.
// Los muestra juntos, uno debajo del otro, en el mismo div bajo el formulario.
// Si no hay errores, muestra el mensaje de éxito
// Limpia el formulario y reinicia el contador de caracteres.
// Evita duplicados en la lista de favoritos al verificar si la sección ya está presente antes de agregarla.
// Asegura que los elementos del DOM existan antes de intentar acceder a ellos para evitar errores.
// Muestra una alerta temporal en la sección de favoritos cuando se agrega un interés.
// Utiliza expresiones regulares para validar el formato de los campos de texto, como nombre, apellido y email.