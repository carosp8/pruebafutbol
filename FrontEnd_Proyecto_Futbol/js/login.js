
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('correoelectronico').value;
    const password = document.getElementById('password').value;

    if (email === 'grupo2@gmail.com' && password === 'Grupo222') {
        window.location.href = 'admin_productos.html';
        return;
    }

    try {
        const response = await fetch('https://grupo222.pythonanywhere.com/usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(email + ':' + password)
            }
        });

        if (response.ok) {
            const data = await response.json();
            const user = data.find(user => user.email === email);
            if (user) {
                window.location.href = 'merchandising.html';
            } else {
                alert('Error en los datos o no está registrado');
            }
        } else {
            alert('Error en los datos o no está registrado');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en la conexión');
    }
});
