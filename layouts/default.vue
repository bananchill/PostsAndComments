
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

  gap: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.875rem;
}
</style>
