<template>
  <div class="min-vh-100" style="background-color: #F3F3F3;">

    <nav class="navbar px-4 py-2" style="background-color: #131921;">
      <span class="navbar-brand fw-bold fs-4" style="color: #FF9900;">🛒 Take-Fast</span>
      <div class="ms-auto d-flex align-items-center gap-3">
        <button class="btn btn-outline-warning position-relative" @click="verCarrito = !verCarrito">
          <i class="bi bi-cart3"></i> Carrito
          <span v-if="carrito.length > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill" style="background-color: #FF9900; color: #131921;">
            {{ carrito.length }}
          </span>
        </button>
        <span class="text-white small"><i class="bi bi-person-circle me-1"></i>{{ usuario }}</span>
        <button class="btn btn-sm fw-bold" style="background-color: #FF9900; color: #131921;" @click="cerrarSesion">
          <i class="bi bi-box-arrow-right me-1"></i> Salir
        </button>
      </div>
    </nav>

    <div class="container py-4">

      <div v-if="verCarrito" class="card shadow mb-4" style="border-top: 3px solid #FF9900;">
        <div class="card-header fw-bold" style="background-color: #232F3E; color: white;">
          <i class="bi bi-cart3 me-2"></i>Mi Carrito
        </div>
        <div class="card-body">
          <div v-if="carrito.length === 0" class="text-muted text-center py-3">
            Tu carrito está vacío
          </div>
          <div v-else>
            <div v-for="(item, i) in carrito" :key="i" class="d-flex justify-content-between align-items-center border-bottom py-2">
              <div>
                <span class="fw-semibold">{{ item.nombre }}</span>
                <span class="text-muted ms-2 small">x{{ item.cantidad }}</span>
              </div>
              <div class="d-flex align-items-center gap-3">
                <span class="text-success fw-bold">${{ (item.precio * item.cantidad).toLocaleString('es-CO') }}</span>
                <button class="btn btn-sm btn-danger" @click="quitarDelCarrito(i)">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
            <div class="d-flex justify-content-between fw-bold mt-3 fs-5">
              <span>Total:</span>
              <span style="color: #FF9900;">${{ totalCarrito.toLocaleString('es-CO') }}</span>
            </div>
            <button class="btn w-100 mt-3 fw-bold" style="background-color: #FF9900; color: #131921;">
              <i class="bi bi-bag-check me-1"></i> Finalizar compra
            </button>
          </div>
        </div>
      </div>

      <div class="d-flex gap-2 flex-wrap mb-4">
        <button
          v-for="cat in categorias"
          :key="cat"
          class="btn btn-sm fw-semibold"
          :style="categoriaActiva === cat ? 'background-color: #FF9900; color: #131921;' : 'background-color: #232F3E; color: white;'"
          @click="categoriaActiva = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div v-if="cargando" class="text-center py-5">
        <div class="spinner-border" style="color: #FF9900;"></div>
      </div>

      <div v-else class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col" v-for="producto in productosFiltrados" :key="producto.id">
          <div class="card h-100 shadow-sm" style="border-top: 3px solid #FF9900;">
            <div class="text-center py-4 fs-1" style="background-color: #f8f8f8;">
              {{ iconoCategoria(producto.categoria) }}
            </div>
            <div class="card-body d-flex flex-column">
              <span class="badge mb-2" style="background-color: #FF9900; color: #131921; width: fit-content;">
                {{ producto.categoria }}
              </span>
              <h6 class="card-title fw-bold">{{ producto.nombre }}</h6>
              <p class="fw-bold text-success fs-5 mb-2">${{ Number(producto.precio).toLocaleString('es-CO') }}</p>
              <p class="small text-muted mb-3">Stock disponible: {{ producto.stock }}</p>
              <button
                class="btn fw-bold mt-auto"
                style="background-color: #FF9900; color: #131921;"
                @click="agregarAlCarrito(producto)"
                :disabled="producto.stock === 0"
              >
                {{ producto.stock === 0 ? 'Sin stock' : '🛒 Agregar al carrito' }}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <footer class="text-center text-white py-3 mt-4" style="background-color: #131921;">
      <p class="mb-0 small">© 2026 Take-Fast — Todos los derechos reservados</p>
    </footer>

  </div>
</template>

<script>
import productService from '../services/productService.js'

export default {
  name: 'TiendaView',
  data() {
    return {
      productos: [],
      carrito: [],
      verCarrito: false,
      categoriaActiva: 'Todos',
      cargando: false,
      usuario: localStorage.getItem('usuarioLogueado')
    }
  },
  async mounted() {
    this.cargando = true
    try {
      const res = await productService.getAll()
      this.productos = res.data
    } finally {
      this.cargando = false
    }
  },
  computed: {
    categorias() {
      const cats = [...new Set(this.productos.map(p => p.categoria))]
      return ['Todos', ...cats]
    },
    productosFiltrados() {
      if (this.categoriaActiva === 'Todos') return this.productos
      return this.productos.filter(p => p.categoria === this.categoriaActiva)
    },
    totalCarrito() {
      return this.carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
    }
  },
  methods: {
    iconoCategoria(categoria) {
      const iconos = { 'Gamer': '🎮', 'Electrodomésticos': '🏠', 'Aseo': '🧹', 'Deportes': '⚽' }
      return iconos[categoria] || '📦'
    },
    agregarAlCarrito(producto) {
      const existente = this.carrito.find(i => i.id === producto.id)
      if (existente) {
        existente.cantidad++
      } else {
        this.carrito.push({ ...producto, cantidad: 1 })
      }
      this.verCarrito = true
    },
    quitarDelCarrito(index) {
      this.carrito.splice(index, 1)
    },
    cerrarSesion() {
      localStorage.removeItem('usuarioLogueado')
      localStorage.removeItem('rolUsuario')
      this.$router.push('/login')
    }
  }
}
</script>