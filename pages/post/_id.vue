<template>
  <div>
   <post v-if="info" :post="info" />
  </div>
</template>

<script>
export default {
  name: 'pageOnePost',
  data () {
    return {
      id: this.$route.params.id,
      info: null
    }
  },
  async mounted () {
    await this.refreshAsync()
  },
  computed: {
    postsApi () {
      return this.$sApp.interfaces.postsApi
    }
  },
  methods: {
    async refreshAsync () {
      await this.getPostsAsync()
    },
    async getPostsAsync () {
      try {
        const res = await this.postsApi.getInfoAsync(this.id)
        this.info = res
        console.log(res)
      } catch (e) {
        console.error(`get posts failed: ${e}`)
      }
    }
  }
}
</script>

<style scoped>

</style>
