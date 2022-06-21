<template>
  <div>
    <post v-if="post" :post="post"/>
  </div>
</template>

<script>

import {convert} from '@/infrastructure/toolkit/transformationJSON';

export default {
  name: 'pageOnePost',
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
        const res = await this.commentsApi.getInfoAsync(this.id);
        this.$set(this.post, 'comments', res);

        if ( this.post.comments) {
          this.post.comments = convert( this.post.comments, {});
          console.log(this.post.comments );
        }
      } catch (e) {
        console.error(`get comments failed: ${e}`)
      }
    }
  }
}
</script>

<style scoped>

</style>
