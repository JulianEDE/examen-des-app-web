<template>
  <nav class="navbar navbar-expand-lg navbar-dark px-4" style="background-color: #131921;">
    <span class="navbar-brand fw-bold fs-4" style="color: #FF9900;">
      🛒 Take-Fast
    </span>
    <div class="ms-auto d-flex align-items-center gap-3">
      <router-link to="/dashboard/productos" class="btn btn-sm fw-bold" :style="$route.path.includes('productos') ? 'background-color: #FF9900; color: #131921;' : 'color: white;'">
        <i class="bi bi-box-seam me-1"></i> Productos
      </router-link>
      <router-link to="/dashboard/usuarios" class="btn btn-sm fw-bold" :style="$route.path.includes('usuarios') ? 'background-color: #FF9900; color: #131921;' : 'color: white;'">
        <i class="bi bi-people me-1"></i> Usuarios
      </router-link>
      <span class="text-white small">
        <i class="bi bi-person-circle me-1"></i> {{ usuario }}
      </span>
      <button class="btn btn-sm fw-bold" style="background-color: #FF9900; color: #131921;" @click="cerrarSesion">
        <i class="bi bi-box-arrow-right me-1"></i> Cerrar Sesión
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    usuario() {
      return localStorage.getItem('usuarioLogueado')
    }
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem('usuarioLogueado')
      localStorage.removeItem('rolUsuario')
      this.$router.push('/login')
    }
  }
}
</script>