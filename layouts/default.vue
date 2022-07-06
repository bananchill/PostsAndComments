<template>
  <div class="all">
    <header>
      <Header/>
    </header>
    <main>
      <Nuxt class="l-width"/>
    </main>
    <notAuthPopup ref="notAuthPopup"/>
    <signInPopup ref="signInPopup"/>
  </div>

</template>

<script>
import Header from '@/components/layouts/header/Header'
import notAuthPopup from '@/components/helpers/popups/notAuthPopup/notAuthPopup'
import signInPopup from '@/components/helpers/popups/signInPopup/signInPopup'

export default {
  name: 'DefaultLayout',
  components: {
    Header,
    notAuthPopup,
    signInPopup
  },
  created () {

  }
  ,
  mounted () {
    this.$eventBus.$on('my-custom-event', () => {
      this.openNotAuthPopup()
    })
  }
  ,
  methods: {
    async openNotAuthPopup () {
      const ell = document.querySelector('body')
      ell.style.overflow = 'hidden'
      const resultPopup = await this.$refs.notAuthPopup.open()
      if (resultPopup) {
        await this.signInPopup()
        // this.$eventBus.$off('my-custom-event')
      }
      ell.style.overflow = 'scroll'
    },
    async signInPopup () {

      const resultPopup = await this.$refs.signInPopup.open()
      if (resultPopup) {
        console.log(resultPopup)
        // this.$eventBus.$off('my-custom-event');
      }
    }

  }
}
</script>

<style scoped lang="scss">


.all {
  gap: 32px;
  flex-direction: column;
  align-items: flex-start;
  word-wrap: break-word;

  header {
    padding: 1.875rem;
  }

  main {
    padding: 2rem;
  }

}

</style>
