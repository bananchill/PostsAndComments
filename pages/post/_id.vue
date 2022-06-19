<template>
  <div>
   <post v-if="post" :post="post"/>
  </div>
</template>

<script>
export default {
  name: 'pageOnePost',
  data () {
    return {
      id: this.$route.params.id,
      post: null
    }
  },
  async mounted () {
    await this.refreshAsync()
  },
  computed: {
    postsApi () {
      return this.$sApp.interfaces.postsApi
    },
    commentsApi () {
      return this.$sApp.interfaces.commentsApi
    }
  },
  methods: {
    async refreshAsync () {
      await this.getPostAsync()
      await this.getCommentsAsync()
    },
    async getPostAsync () {
      try {
        this.post = await this.postsApi.getInfoAsync(this.id)
      } catch (e) {
        console.error(`get posts failed: ${e}`)
      }
    },
    async getCommentsAsync () {
      try {
        this.post.comments = await this.commentsApi.getInfoAsync(this.id)
        console.log(this.post.comments)
      } catch (e) {
        console.error(`get comments failed: ${e}`)
      }
    }
  }
}
</script>

<style scoped>

</style>
