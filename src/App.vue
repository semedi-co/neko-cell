<script setup>
import NavTopVue from "./components/NavTop.vue";
</script>

<template>
  <NavTopVue />
  <div class="container mt-5">
    <router-view v-slot="{ Component }">
      <transition name="slide-right">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
