<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/"  :class="{ 'nav-link': true, 'nav-link-active': $route.path === '/' }">Dashboard</RouterLink>
      <RouterLink to="/transactions" :class="{ 'nav-link': true, 'nav-link-active': $route.path === '/transactions' }">Transactions</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.header {
  background-color: #f2f2f2;
  padding: 0 40px;
}

.nav {
  display: flex;
}

.nav-link {
  color: #333;
  text-decoration: none;
  padding: 10px 20px;
  transition: color 0.3s;
  font-size: 20px;
  font-weight: 600;
}

.nav-link-active {
  background-color: #d0cdcd;
}

.nav-link:hover {
  color: #2c2a2a;
}
</style>
