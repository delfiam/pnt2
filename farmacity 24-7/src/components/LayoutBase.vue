<script setup>
defineProps(['usuario', 'onLogout'])
</script>

<template>
<div class="layout">
    <header>
        <p v-if = "usuario">Sesión Activa como: {{ usuario.username }}</p>
        <p v-else> usuario: anonimo</p>
        <button @click="onLogout">Cerrar Sesión</button>
    </header>
    <main>
        <slot />
    </main>
</div>
</template>

<style scoped>
.layout {
  padding: 1rem;
}
header {
  background: #eee;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
}
</style>