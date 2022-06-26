
<template>
  <div class="all">
    <header>
      <Header/>
    </header>
    <main>
      <Nuxt class="l-width"/>
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
template {

}

.all {
  background: #F5F5F5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  --layout-width: 96.25rem;
  padding: 1.875rem;
}
</style>
