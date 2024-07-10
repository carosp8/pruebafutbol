
const { createApp } = Vue;

createApp({
    data() {
        return {
            url: "https://grupo222.pythonanywhere.com/productos",
            datos: [],
            error: false,
            producto: {
                id: '',
                nomprod: '',
                precio: 0,
                stock: 0,
                imagen: '',
                descrip: ''
            }
        }
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch(this.url);
                if (!response.ok) {
                    throw new Error('Error al cargar los productos');
                }
                this.datos = await response.json();
            } catch (error) {
                console.error('Error:', error);
                this.error = true;
            }
        },
        mostrarFormulario(id) {
            const productoSeleccionado = this.datos.find(p => p.id === id);
            if (productoSeleccionado) {
                this.producto.id = productoSeleccionado.id;
                this.producto.nomprod = productoSeleccionado.nomprod;
                this.producto.precio = productoSeleccionado.precio;
                this.producto.stock = productoSeleccionado.stock;
                this.producto.imagen = productoSeleccionado.imagen;
                this.producto.descrip = productoSeleccionado.descrip;
            }
        },
        async editarProducto() {
            try {
                const response = await fetch(`${this.url}/${this.producto.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.producto)
                });

                if (!response.ok) {
                    throw new Error('Error al actualizar el producto');
                }

                // Actualizar la lista de productos después de editar
                await this.fetchData();
            } catch (error) {
                console.error('Error:', error);
                alert('Error al actualizar el producto');
            }
        },
        async eliminarProducto(id) {
            try {
                const response = await fetch(`${this.url}/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el producto');
                }

                // Actualizar la lista de productos después de eliminar
                await this.fetchData();
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar el producto');
            }
        }
    },
    mounted() {
        this.fetchData(); // Llama a fetchData al montar el componente
    }
}).mount('#app');
