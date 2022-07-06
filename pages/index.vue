<template>
  <div class="main__block">
    <div class="show__all__posts">
      <all-post
        v-for="post in posts"
        :post="post"
        :key="post.id"
        class="show__post"
      />
    </div>
    <div class="all__popular__posts">
      <div class="title__blocks">
        <h3>Популярные вопросы</h3>
      </div>
      <div class="popular__posts">
        <popularPost/>
      </div>

    </div>
  </div>
</template>

<script>
import AllPost from '@/components/pages/post/post'
import popularPost from '@/components/pages/post/popular/popularPost'

export default {
  name: 'OnePost',
  components: {
    AllPost,
    popularPost
  },
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
    },
    async getPopularPostsAsync () {
      try {
        const variables = {
          limit: 3,
          sortType: 'POPULAR'
        }

        const res = await this.postsApi.getListAsync(variables)
        this.posts = res.items
        console.log(res.items)
      } catch (e) {
        console.error(`get posts failed: ${e}`)
      }
    }
  }
}
</script>
<style append lang="scss">

.main__block {
  display: flex;
  flex-direction: row;
  .show__all__posts {
    width: 60%;
    .show__post {

    }

  }

  .all__popular__posts {
    margin-left: 1rem;
    width: 40%;

    .title__blocks {
      font-weight: 400;
    }

    .popular__posts {
      margin-top: 0.5rem;
    }

  }
}

</style>
