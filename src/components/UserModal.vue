<template>
  <div v-if="visible" class="modal-overlay" @click.self="$emit('cerrar')">
    <div class="card shadow-lg" style="width: 500px; border-top: 4px solid #FF9900;">
      <div class="card-header d-flex justify-content-between align-items-center" style="background-color: #131921; color: white;">
        <h5 class="mb-0">
          <i :class="`bi bi-${editando ? 'pencil-square' : 'person-plus'} me-2`" style="color: #FF9900;"></i>
          {{ editando ? 'Editar Usuario' : 'Nuevo Usuario' }}
        </h5>
        <button class="btn-close btn-close-white" @click="$emit('cerrar')"></button>
      </div>
      <div class="card-body p-4">
        <div class="mb-3">
          <label class="form-label fw-semibold">Nombre de Usuario</label>
          <input type="text" class="form-control" :class="{'is-invalid': errores.userName}" v-model="form.userName" placeholder="Ej: Juan123" />
          <div class="invalid-feedback">{{ errores.userName }}</div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold">Contraseña</label>
          <input type="password" class="form-control" :class="{'is-invalid': errores.password}" v-model="form.password" placeholder="Contraseña" />
          <div class="invalid-feedback">{{ errores.password }}</div>
        </div>
        <div class="mb-4">
          <label class="form-label fw-semibold">Rol</label>
          <select class="form-select" :class="{'is-invalid': errores.role}" v-model="form.role">
            <option value="">Selecciona un rol</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <div class="invalid-feedback">{{ errores.role }}</div>
        </div>
        <div class="d-flex gap-2">
          <button class="btn flex-fill fw-bold" style="background-color: #FF9900; color: #131921;" @click="guardar">
            <i :class="`bi bi-${editando ? 'check-lg' : 'plus-lg'} me-1`"></i>
            {{ editando ? 'Guardar Cambios' : 'Agregar Usuario' }}
          </button>
          <button class="btn btn-secondary flex-fill" @click="$emit('cerrar')">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserModal',
  props: {
    visible: Boolean,
    usuario: Object
  },
  emits: ['cerrar', 'guardar'],
  data() {
    return {
      form: { userName: '', password: '', role: '' },
      errores: { userName: '', password: '', role: '' }
    }
  },
  computed: {
    editando() {
      return this.usuario && this.usuario.id
    }
  },
  watch: {
    usuario(val) {
      if (val) {
        this.form = { ...val }
      } else {
        this.form = { userName: '', password: '', role: '' }
      }
      this.errores = { userName: '', password: '', role: '' }
    }
  },
  methods: {
    guardar() {
      this.errores = { userName: '', password: '', role: '' }
      let valido = true
      if (!this.form.userName) { this.errores.userName = 'El nombre de usuario es obligatorio'; valido = false }
      if (!this.form.password || this.form.password.length < 4) { this.errores.password = 'La contraseña debe tener al menos 4 caracteres'; valido = false }
      if (!this.form.role) { this.errores.role = 'El rol es obligatorio'; valido = false }
      if (!valido) return
      this.$emit('guardar', { ...this.form })
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