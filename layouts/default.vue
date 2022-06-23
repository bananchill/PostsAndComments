<template>
  <div>
    <header>
      <Header/>
    </header>
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
import Header from '@/components/layouts/header/Header'
export default {
  name: 'DefaultLayout',
  components: { Header }
}
</script>

<style scoped>

</style>
