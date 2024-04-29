<template>
  <div class="flex flex-col min-h-screen">
    <LayoutHeader class="max-md:hidden"/>
    <LayoutResponsiveHeader class="md:hidden "/>
    <div class="flex-grow bg-gray-50">
      <slot></slot>
    </div>
    <LayoutFooter />
    <AuthDialog />
    <AuthRequired />
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
</script>
