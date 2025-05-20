<!-- src/pages/RegisterForm.vue -->

<template>
  <div>
    <RegisterForm />
    <p>¿Ya tienes cuenta? <router-link to="/login">Volver al login</router-link></p>
  </div>
</template>

<script setup>
import RegisterForm from '@/components/RegisterForm.vue'
</script>