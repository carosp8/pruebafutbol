
const { createApp } = Vue
createApp({
  data() {
    return {
      url: "https://grupo222.pythonanywhere.com/productos",
      producto: null,
      error: false,
      id: new URLSearchParams(window.location.search).get('id')
    }
  },
  methods: {
    fetchProducto() {
      fetch(`${this.url}/${this.id}`)
        .then(response => response.json())
        .then(data => {
          this.producto = data
        })
        .catch(error => {
          console.log("Error:" + error)
          this.error = true
        });
    },
    updateProducto() {
      fetch(`${this.url}/${this.producto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.producto)
      })
      .then(response => response.json())
      .then(data => {
        alert('Producto actualizado correctamente');
        window.location.href = 'admin_productos.html';
      })
      .catch(error => console.error('Error:', error));
    }
  },
  created() {
    this.fetchProducto()
  }
}).mount('#app')
