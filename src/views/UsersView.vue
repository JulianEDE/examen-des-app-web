<template>
  <div class="min-vh-100" style="background-color: #F3F3F3;">
    <Navbar />
    <div class="container py-4">

      <AlertMessage :mensaje="alerta.mensaje" :tipo="alerta.tipo" @cerrar="alerta.mensaje = ''" />

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="fw-bold mb-0"><i class="bi bi-people me-2" style="color: #FF9900;"></i>Gestión de Usuarios</h4>
        <button class="btn fw-bold" style="background-color: #FF9900; color: #131921;" @click="abrirModalAgregar">
          <i class="bi bi-person-plus me-1"></i> Nuevo Usuario
        </button>
      </div>

      <div class="card shadow-sm">
        <div class="card-body p-0">
          <table class="table table-hover mb-0">
            <thead style="background-color: #232F3E; color: white;">
              <tr>
                <th class="py-3 px-4">#</th>
                <th class="py-3">Usuario</th>
                <th class="py-3">Rol</th>
                <th class="py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="cargando">
                <td colspan="4" class="text-center py-4">
                  <div class="spinner-border" style="color: #FF9900;"></div>
                </td>
              </tr>
              <tr v-else v-for="(usuario, index) in usuarios" :key="usuario.id">
                <td class="px-4 py-3">{{ index + 1 }}</td>
                <td class="py-3 fw-semibold">
                  <i class="bi bi-person-circle me-2" style="color: #FF9900;"></i>{{ usuario.userName }}
                </td>
                <td class="py-3">
                  <span class="badge" :style="usuario.role === 'Admin' ? 'background-color: #131921; color: #FF9900;' : 'background-color: #FF9900; color: #131921;'">
                    {{ usuario.role }}
                  </span>
                </td>
                <td class="py-3 text-center">
                  <button class="btn btn-sm btn-warning me-2" @click="abrirModalEditar(usuario)">
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button class="btn btn-sm btn-danger" @click="abrirConfirmar(usuario)">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <UserModal
      :visible="showModal"
      :usuario="usuarioSeleccionado"
      @cerrar="showModal = false"
      @guardar="guardarUsuario"
    />

    <ConfirmModal
      :visible="showConfirm"
      :nombre="usuarioSeleccionado ? usuarioSeleccionado.userName : ''"
      @confirmar="eliminarUsuario"
      @cancelar="showConfirm = false"
    />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import AlertMessage from '../components/AlertMessage.vue'
import UserModal from '../components/UserModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'
import userService from '../services/userService.js'

export default {
  name: 'UsersView',
  components: { Navbar, AlertMessage, UserModal, ConfirmModal },
  data() {
    return {
      usuarios: [],
      cargando: false,
      showModal: false,
      showConfirm: false,
      usuarioSeleccionado: null,
      alerta: { mensaje: '', tipo: 'success' }
    }
  },
  async mounted() {
    await this.cargarUsuarios()
  },
  methods: {
    async cargarUsuarios() {
      this.cargando = true
      try {
        const res = await userService.getAll()
        this.usuarios = res.data
      } catch {
        this.alerta = { mensaje: 'Error al cargar usuarios.', tipo: 'danger' }
      } finally {
        this.cargando = false
      }
    },
    abrirModalAgregar() {
      this.usuarioSeleccionado = null
      this.showModal = true
    },
    abrirModalEditar(usuario) {
      this.usuarioSeleccionado = { ...usuario }
      this.showModal = true
    },
    abrirConfirmar(usuario) {
      this.usuarioSeleccionado = usuario
      this.showConfirm = true
    },
    async guardarUsuario(form) {
      try {
        if (form.id) {
          await userService.update(form.id, form)
          this.alerta = { mensaje: 'Usuario actualizado correctamente.', tipo: 'success' }
        } else {
          await userService.create(form)
          this.alerta = { mensaje: 'Usuario creado correctamente.', tipo: 'success' }
        }
        this.showModal = false
        await this.cargarUsuarios()
      } catch {
        this.alerta = { mensaje: 'Error al guardar el usuario.', tipo: 'danger' }
      }
    },
    async eliminarUsuario() {
      try {
        await userService.delete(this.usuarioSeleccionado.id)
        this.alerta = { mensaje: 'Usuario eliminado correctamente.', tipo: 'success' }
        this.showConfirm = false
        await this.cargarUsuarios()
      } catch {
        this.alerta = { mensaje: 'Error al eliminar el usuario.', tipo: 'danger' }
      }
    }
  }
}
</script>