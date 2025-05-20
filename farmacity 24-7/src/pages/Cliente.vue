<!-- ./src/pages/Cliente.vue -->

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { obtenerUsuarioActual, logout } from '@/store/auth';
import LayoutBase from '@/components/LayoutBase.vue';

const message = ref("")
const usuario = ref(null)
const router = useRouter()

onMounted(() => {
    usuario.value = obtenerUsuarioActual()
    if (usuario.value) {
        message.value = `Usuario logeado: ${usuario.value.username}`
    }
    else {
        message.value = `no hay usuario logeado`
    }
})

function cerrarSesion (){
    logout()
    router.push("/")
}

</script>

<template>
    <LayoutBase :usuario="usuario" :onLogout="cerrarSesion">
        <h2>Bienvenido al Panel de Cliente</h2>
    </LayoutBase>
</template>