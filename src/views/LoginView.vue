<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center" style="background-color: #131921;">
    <div class="card shadow-lg" style="width: 390px; border-top: 4px solid #FF9900;">
      <div class="card-body p-4">

        <div class="text-center mb-4">
          <h2 class="fw-bold" style="color: #FF9900;">🛒 Take-Fast</h2>
          <p class="text-muted small">Sistema de gestión de inventario</p>
        </div>

        <AlertMessage :mensaje="error" tipo="danger" @cerrar="error = ''" />

        <div class="mb-3">
          <label class="form-label fw-semibold">Usuario</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-person-fill"></i></span>
            <input type="text" class="form-control" v-model="usuario" placeholder="Ingresa tu usuario" @keyup.enter="iniciarSesion" />
          </div>
        </div>
        <div class="mb-4">
          <label class="form-label fw-semibold">Contraseña</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
            <input type="password" class="form-control" v-model="password" placeholder="Ingresa tu contraseña" @keyup.enter="iniciarSesion" />
          </div>
        </div>

        <button class="btn w-100 fw-bold" style="background-color: #FF9900; color: #131921;" @click="iniciarSesion" :disabled="cargando">
          <span v-if="cargando"><i class="bi bi-hourglass-split me-1"></i> Verificando...</span>
          <span v-else><i class="bi bi-box-arrow-in-right me-1"></i> Iniciar Sesión</span>
        </button>

        <p class="text-muted text-center mt-3" style="font-size: 11px;">
          ⚠️ Esta validación es solo educativa y no representa un sistema de autenticación real.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AlertMessage from '../components/AlertMessage.vue'
import authService from '../services/authService.js'

export default {
  name: 'LoginView',
  components: { AlertMessage },
  data() {
    return {
      usuario: '',
      password: '',
      error: '',
      cargando: false
    }
  },
  methods: {
    async iniciarSesion() {
      if (!this.usuario || !this.password) {
        this.error = 'Por favor completa todos los campos.'
        return
      }
      this.cargando = true
      try {
        const encontrado = await authService.findUser(this.usuario, this.password)
        if (encontrado) {
          localStorage.setItem('usuarioLogueado', encontrado.userName)
          localStorage.setItem('rolUsuario', encontrado.role)
          this.$router.push('/dashboard/productos')
        } else {
          this.error = 'Usuario o contraseña incorrectos.'
        }
      } catch (e) {
        this.error = 'Error al conectar con el servidor.'
      } finally {
        this.cargando = false
      }
    }
  }
}
</script>