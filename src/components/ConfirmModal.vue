<template>
  <div v-if="visible" class="modal-overlay" @click.self="$emit('cancelar')">
    <div class="card shadow-lg" style="width: 420px; border-top: 4px solid #dc3545;">
      <div class="card-header d-flex justify-content-between align-items-center" style="background-color: #131921; color: white;">
        <h5 class="mb-0"><i class="bi bi-exclamation-triangle-fill text-danger me-2"></i>Confirmar eliminación</h5>
        <button class="btn-close btn-close-white" @click="$emit('cancelar')"></button>
      </div>
      <div class="card-body p-4 text-center">
        <p class="fs-5">¿Estás seguro de que deseas eliminar <strong>{{ nombre }}</strong>?</p>
        <p class="text-muted small">Esta acción no se puede deshacer.</p>
        <div class="d-flex gap-2 justify-content-center mt-3">
          <button class="btn btn-danger fw-bold px-4" @click="$emit('confirmar')">
            <i class="bi bi-trash me-1"></i> Eliminar
          </button>
          <button class="btn btn-secondary fw-bold px-4" @click="$emit('cancelar')">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    visible: Boolean,
    nombre: String
  },
  emits: ['confirmar', 'cancelar']
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