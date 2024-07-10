
document.addEventListener('DOMContentLoaded', function () {
    // Limpiar los campos de contraseña al cargar la página
    document.getElementById('password').value = '';
    document.getElementById('repeat-password').value = '';

    // Función para crear opciones de select
    function createSelectOptions(select, start, end) {
        for (let i = start; i <= end; i++) {
            const option = document.createElement('option');
            option.text = i;
            select.add(option);
        }
    }

    // Obtener elementos de fecha de nacimiento
    const birthDaySelect = document.getElementById('birthday-day');
    const birthMonthSelect = document.getElementById('birthday-month');
    const birthYearSelect = document.getElementById('birthday-year');

    // Crear opciones para día y año
    createSelectOptions(birthDaySelect, 1, 31);
    createSelectOptions(birthYearSelect, 1965, new Date().getFullYear());

    // Crear opciones para mes
    const monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    for (let i = 0; i < 12; i++) {
        const option = document.createElement('option');
        option.text = monthNames[i];
        option.value = i + 1;
        birthMonthSelect.add(option);
    }
});

async function handleFormSubmit(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const birthdayDay = document.getElementById('birthday-day').value;
    const birthdayMonth = document.getElementById('birthday-month').value;
    const birthdayYear = document.getElementById('birthday-year').value;
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const prefijo = document.getElementById('prefijo').value;
    const numero = document.getElementById('numero').value;
    const email = document.getElementById('correoelectronico').value;
    const horario = document.querySelector('select[name="horario"]').value;
    const clave = document.getElementById('password').value;

    const f_nac = `${birthdayYear}-${birthdayMonth}-${birthdayDay}`;
    const telef = `${prefijo}${numero}`;

    const usuario = {
        nombre,
        apellido,
        dni,
        f_nac,
        sexo,
        pref: prefijo,
        telef,
        email,
        horario,
        clave
    };

    try {
        const response = await fetch('https://grupo222.pythonanywhere.com/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (response.ok) {
            alert('Registro exitoso');
            window.location.href = 'index.html';
        } else {
            alert('Error en el registro');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en la conexión');
    }
}

document.getElementById('registroForm').addEventListener('submit', handleFormSubmit);
