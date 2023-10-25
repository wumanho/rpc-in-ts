<script setup lang="ts">
import { createClientProxy } from '@rpc-in-ts/client'
import { AppRouter } from '@rpc-in-ts/server'

const test = async () => {
  const trpc = createClientProxy<AppRouter>('/trpc')
  const res = await trpc.a('a')
  console.log(res, 'webres')
}
</script>

<template>
  <button @click="test">初始化</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
