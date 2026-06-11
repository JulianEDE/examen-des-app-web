<template>
  <div v-if="mensaje" :class="`alert alert-${tipo} alert-dismissible fade show`" role="alert">
    <i :class="`bi bi-${icono} me-2`"></i> {{ mensaje }}
    <button type="button" class="btn-close" @click="$emit('cerrar')"></button>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  props: {
    mensaje: String,
    tipo: {
      type: String,
      default: 'success'
    }
  },
  emits: ['cerrar'],
  computed: {
    icono() {
      const iconos = {
        success: 'check-circle-fill',
        danger: 'exclamation-triangle-fill',
        warning: 'exclamation-circle-fill',
        info: 'info-circle-fill'
      }
      return iconos[this.tipo] || 'info-circle-fill'
    }
  }
}
</script>