<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center" style="background-color: #131921;">
    <div class="text-center">
      <h1 class="fw-bold" style="color: #FF9900; font-size: 100px;">404</h1>
      <h3 class="text-white mb-3">Página no encontrada</h3>
      <p class="text-muted mb-4">La página que buscas no existe.</p>
      <router-link to="/dashboard/productos" class="btn fw-bold" style="background-color: #FF9900; color: #131921;">
        <i class="bi bi-house me-1"></i> Volver al inicio
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>