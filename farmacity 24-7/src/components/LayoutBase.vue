
<script setup>
import { useAuthStore } from '@/store/auth';
const auth = useAuthStore()
defineProps(['usuario', 'onLogout'])
</script>

<template>
<div class="layout">
    <header>
        <p v-if = "auth.currentUser">Sesión Activa como: {{ auth.currentUser.username }}</p>
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