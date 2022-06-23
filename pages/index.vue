<template>
  <div class="data__item">
    <post
      v-for="post in posts"
      :post="post"
      :key="post.id"
    />
  </div>
</template>

<script>
export default {
  name: 'AllPost',
  data () {
    return {
      posts: null,
    }
  },
  computed: {
    postsApi () {
      return this.$sApp.interfaces.postsApi
    },
  }
  ,
  async mounted () {
    await this.refreshAsync()
  }
  ,
  methods: {
    async refreshAsync () {
      await this.getPostsAsync()
    }
    ,
    async getPostsAsync () {
      try {
        const res = await this.postsApi.getListAsync()
        this.posts = res.items
      } catch (e) {
        console.error(`get posts failed: ${e}`)
      }
    }
  }
}
</script>
