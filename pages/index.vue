<template>
  <div>
      <div class="data__item">
        <post
          v-for="post in posts"
          :post="post"
          :key="post.id"
        />
      </div>
  </div>
</template>

<script>
// Components

export default {
  name: 'AllPost',
  components:{
  },
  data(){
    return {
      posts: null
    }
  },
  computed: {
    postsApi(){
      return this.$sApp.interfaces.postsApi;
    }
  },
  async mounted () {
    await this.refreshAsync();
  },
  methods: {
    async refreshAsync(){
      await this.getPostsAsync()
    },
    async getPostsAsync(){
      try {
        const res = await this.postsApi.getListAsync();
        this.posts = res.items;
        console.log(this.posts)
      }
      catch (e) {
        console.error(`get posts failed: ${e}`)
      }
    }
  }
}
</script>

<style>

</style>
