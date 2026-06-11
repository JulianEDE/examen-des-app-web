<template>
  <div v-if="visible" class="modal-overlay" @click.self="$emit('cerrar')">
    <div class="card shadow-lg" style="width: 500px; border-top: 4px solid #FF9900;">
      <div class="card-header d-flex justify-content-between align-items-center" style="background-color: #131921; color: white;">
        <h5 class="mb-0">
          <i :class="`bi bi-${editando ? 'pencil-square' : 'plus-circle'} me-2`" style="color: #FF9900;"></i>
          {{ editando ? 'Editar Producto' : 'Nuevo Producto' }}
        </h5>
        <button class="btn-close btn-close-white" @click="$emit('cerrar')"></button>
      </div>
      <div class="card-body p-4">
        <div class="mb-3">
          <label class="form-label fw-semibold">Nombre del Producto</label>
          <input type="text" class="form-control" :class="{'is-invalid': errores.nombre}" v-model="form.nombre" placeholder="Ej: Mouse Gamer" />
          <div class="invalid-feedback">{{ errores.nombre }}</div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold">Categoría</label>
          <select class="form-select" :class="{'is-invalid': errores.categoria}" v-model="form.categoria">
            <option value="">Selecciona una categoría</option>
            <option>Gamer</option>
            <option>Electrodomésticos</option>
            <option>Aseo</option>
            <option>Deportes</option>
          </select>
          <div class="invalid-feedback">{{ errores.categoria }}</div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold">Precio (COP)</label>
          <input type="number" class="form-control" :class="{'is-invalid': errores.precio}" v-model="form.precio" placeholder="Ej: 150000" />
          <div class="invalid-feedback">{{ errores.precio }}</div>
        </div>
        <div class="mb-4">
          <label class="form-label fw-semibold">Stock</label>
          <input type="number" class="form-control" :class="{'is-invalid': errores.stock}" v-model="form.stock" placeholder="Ej: 10" />
          <div class="invalid-feedback">{{ errores.stock }}</div>
        </div>
        <div class="d-flex gap-2">
          <button class="btn flex-fill fw-bold" style="background-color: #FF9900; color: #131921;" @click="guardar">
            <i :class="`bi bi-${editando ? 'check-lg' : 'plus-lg'} me-1`"></i>
            {{ editando ? 'Guardar Cambios' : 'Agregar Producto' }}
          </button>
          <button class="btn btn-secondary flex-fill" @click="$emit('cerrar')">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductModal',
  props: {
    visible: Boolean,
    producto: Object
  },
  emits: ['cerrar', 'guardar'],
  data() {
    return {
      form: { nombre: '', categoria: '', precio: '', stock: '' },
      errores: { nombre: '', categoria: '', precio: '', stock: '' }
    }
  },
  computed: {
    editando() {
      return this.producto && this.producto.id
    }
  },
  watch: {
    producto(val) {
      if (val) {
        this.form = { ...val }
      } else {
        this.form = { nombre: '', categoria: '', precio: '', stock: '' }
      }
      this.errores = { nombre: '', categoria: '', precio: '', stock: '' }
    }
  },
  methods: {
    guardar() {
      this.errores = { nombre: '', categoria: '', precio: '', stock: '' }
      let valido = true
      if (!this.form.nombre) { this.errores.nombre = 'El nombre es obligatorio'; valido = false }
      if (!this.form.categoria) { this.errores.categoria = 'La categoría es obligatoria'; valido = false }
      if (!this.form.precio || this.form.precio <= 0) { this.errores.precio = 'El precio debe ser mayor a 0'; valido = false }
      if (!this.form.stock || this.form.stock < 0) { this.errores.stock = 'El stock no puede ser negativo'; valido = false }
      if (!valido) return
      this.$emit('guardar', { ...this.form, precio: Number(this.form.precio), stock: Number(this.form.stock) })
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>