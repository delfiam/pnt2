<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import LayoutBase from '@/components/LayoutBase.vue';

const auth = useAuthStore()
const message = ref("")
const usuario = ref(null)
const router = useRouter()

onMounted(() => {
    
    if (auth.currentUser) {
        message.value = `Usuario logeado: ${auth.currentUser.username} rol: ${auth.currentUser.rol}`
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
    <!-- <p>{{ message }}</p> -->
    <LayoutBase :usuario="usuario" :onLogout="cerrarSesion">
        <h2>Bienvenido al Panel de Administrador</h2>
    </LayoutBase>
</template>