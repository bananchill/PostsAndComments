<template>
  <div class="all__posts">
    <div class="data__post"
         v-for="(post, index) in posts"
         :key="index"
    >
      <div class="post__item">
        <nuxt-link :to="`/post/${post.id}`" class="links__item ">
          <div class="post__title">
            {{ post.name }}
          </div>
          <div class="post__desc">
            {{ post.desc }}
          </div>
        </nuxt-link>
        <div class="answer">
          <div class="img__answer">
            <img src="../../../../static/scale_1200.png" alt="">
          </div>
          <div class="count__answer">
            <span>{{ post.comments_count }}</span> ответов
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'popularPost',
  props: {},
  data () {
    return {
      posts: null,
    }
  },
  computed: {
    postsApi () {
      return this.$sApp.interfaces.postsApi
    }
  },
  async mounted () {
    await this.refreshAsync()
  }
  ,
  methods: {
    async refreshAsync () {
      await this.getPopularPostsAsync()
    }
    ,
    async getPopularPostsAsync () {
      try {
        const variables = {
          limit: 3,
          sortType: 'POPULAR'
        }

        const res = await this.postsApi.getListAsync(variables)
        this.posts = res.items
      } catch (e) {
        console.error(`get posts failed: ${e}`)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.all__posts {
  width: 100%;

  .data__post {
    margin-bottom: 0.5rem;

    .post__item {
      border-radius: 0.5rem;
      padding: 0.5rem 0 0.5rem 1rem;
      background: var(--background100);

      .post__title {
        font-weight: 600;
      }

      .answer {
        display: flex;
        margin-top: 1rem;

        .img__answer img {
          width: 1rem;
          height: 1rem;
        }

        .count__answer {
          font-weight: 400;
          color: var(--color80);
          margin-left: 0.5rem
        }
      }
    }


  }
}

</style>
