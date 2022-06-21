<template>
  <div>
    <div class="menu__community">
      <div class="view__community"
           v-for="community in communities"
           :key="community.id"
      >
        <div class="show__name__community">
          <a> {{ community.name }}</a>
        </div>

      </div>
    </div>
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
  components: {},
  data () {
    return {
      posts: null,
      communities: [
        {
          id: 1,
          name: 'Все',
          isShow: true
        },
        {
          id: 2,
          name: 'Темы',
          isShow: false
        },
        {
          id: 1,
          name: 'Группы',
          isShow: false
        }
      ]
    }
  },
  computed: {
    postsApi () {
      return this.$sApp.interfaces.postsApi
    }
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
        console.log(this.posts)
      } catch (e) {
        console.error(`get posts failed: ${e}`)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.menu__community {
  display: flex;
  justify-content: space-between;
  background: aliceblue;
  align-items: center;
  border: 0.1rem solid #ff0040;
  border-radius: 0.5rem;
  height: 1.8rem;
  width: 14rem;
  .view__community {

    align-content: center;
    padding-left: 10px;
    font-size: 18px;
    margin-right: 1rem;
    flex: 1;
    .show__name__community {
    }
    .show__name__community :hover {
      background: #ff0040;
      border-radius: 0.5rem;
    }
  }
}
</style>
