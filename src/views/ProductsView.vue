<template>
  <div class="min-vh-100" style="background-color: #F3F3F3;">
    <Navbar />
    <div class="container py-4">

      <AlertMessage :mensaje="alerta.mensaje" :tipo="alerta.tipo" @cerrar="alerta.mensaje = ''" />

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="fw-bold mb-0"><i class="bi bi-box-seam me-2" style="color: #FF9900;"></i>Gestión de Productos</h4>
        <button class="btn fw-bold" style="background-color: #FF9900; color: #131921;" @click="abrirModalAgregar">
          <i class="bi bi-plus-lg me-1"></i> Nuevo Producto
        </button>
      </div>

      <div class="card shadow-sm">
        <div class="card-body p-0">
          <table class="table table-hover mb-0">
            <thead style="background-color: #232F3E; color: white;">
              <tr>
                <th class="py-3 px-4">#</th>
                <th class="py-3">Nombre</th>
                <th class="py-3">Categoría</th>
                <th class="py-3">Precio</th>
                <th class="py-3">Stock</th>
                <th class="py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="cargando">
                <td colspan="6" class="text-center py-4">
                  <div class="spinner-border" style="color: #FF9900;"></div>
                </td>
              </tr>
              <tr v-else v-for="(producto, index) in productos" :key="producto.id">
                <td class="px-4 py-3">{{ index + 1 }}</td>
                <td class="py-3 fw-semibold">{{ producto.nombre }}</td>
                <td class="py-3">
                  <span class="badge" style="background-color: #FF9900; color: #131921;">{{ producto.categoria }}</span>
                </td>
                <td class="py-3 text-success fw-bold">${{ Number(producto.precio).toLocaleString('es-CO') }}</td>
                <td class="py-3">{{ producto.stock }}</td>
                <td class="py-3 text-center">
                  <button class="btn btn-sm btn-warning me-2" @click="abrirModalEditar(producto)">
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button class="btn btn-sm btn-danger" @click="abrirConfirmar(producto)">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <ProductModal
      :visible="showModal"
      :producto="productoSeleccionado"
      @cerrar="showModal = false"
      @guardar="guardarProducto"
    />

    <ConfirmModal
      :visible="showConfirm"
      :nombre="productoSeleccionado ? productoSeleccionado.nombre : ''"
      @confirmar="eliminarProducto"
      @cancelar="showConfirm = false"
    />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import AlertMessage from '../components/AlertMessage.vue'
import ProductModal from '../components/ProductModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'
import productService from '../services/productService.js'

export default {
  name: 'ProductsView',
  components: { Navbar, AlertMessage, ProductModal, ConfirmModal },
  data() {
    return {
      productos: [],
      cargando: false,
      showModal: false,
      showConfirm: false,
      productoSeleccionado: null,
      alerta: { mensaje: '', tipo: 'success' }
    }
  },
  async mounted() {
    await this.cargarProductos()
  },
  methods: {
    async cargarProductos() {
      this.cargando = true
      try {
        const res = await productService.getAll()
        this.productos = res.data
      } catch {
        this.alerta = { mensaje: 'Error al cargar productos.', tipo: 'danger' }
      } finally {
        this.cargando = false
      }
    },
    abrirModalAgregar() {
      this.productoSeleccionado = null
      this.showModal = true
    },
    abrirModalEditar(producto) {
      this.productoSeleccionado = { ...producto }
      this.showModal = true
    },
    abrirConfirmar(producto) {
      this.productoSeleccionado = producto
      this.showConfirm = true
    },
    async guardarProducto(form) {
      try {
        if (form.id) {
          await productService.update(form.id, form)
          this.alerta = { mensaje: 'Producto actualizado correctamente.', tipo: 'success' }
        } else {
          await productService.create(form)
          this.alerta = { mensaje: 'Producto creado correctamente.', tipo: 'success' }
        }
        this.showModal = false
        await this.cargarProductos()
      } catch {
        this.alerta = { mensaje: 'Error al guardar el producto.', tipo: 'danger' }
      }
    },
    async eliminarProducto() {
      try {
        await productService.delete(this.productoSeleccionado.id)
        this.alerta = { mensaje: 'Producto eliminado correctamente.', tipo: 'success' }
        this.showConfirm = false
        await this.cargarProductos()
      } catch {
        this.alerta = { mensaje: 'Error al eliminar el producto.', tipo: 'danger' }
      }
    }
  }
}
</script>