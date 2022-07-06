<template>
  <div class="main__block">
    <div class="show__all__posts">
      <all-post
        v-if="post"
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

import { convert } from '@/infrastructure/toolkit/transformationJSON'
import AllPost from '@/components/pages/post/post'
import popularPost from '@/components/pages/post/popular/popularPost'

export default {
  name: 'pageOnePost',
  components: {
    AllPost,
    popularPost
  },
  data () {
    return {
      id: this.$route.params.id,
      post: null,

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
        const res = await this.commentsApi.getInfoAsync(this.id)
        this.$set(this.post, 'comments', res)

        if (this.post.comments) {
          this.post.comments = convert(this.post.comments, {})
          console.log(this.post.comments)
        }
      } catch (e) {
        console.error(`get comments failed: ${e}`)
      }
    }
  }
}
</script>

<style scoped lang="scss">

.main__block {
  display: flex;

  .show__all__posts {
    width: 60%;
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
