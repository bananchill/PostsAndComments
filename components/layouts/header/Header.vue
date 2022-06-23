<template>
  <div class="menu__community">
    <nuxt-link
      class="view__community"
      :to="{
        name: tab.name
      }"
      v-for="tab in tabs"
      :key="tab.id"
      @click="setActiveTab(tab)"
    >
      {{ tab.title }}
    </nuxt-link>
  </div>
</template>

<script>
const tabs = {
  All: {
    id: 1,
    title: 'Все',
    name: 'index'
  },
  Theme: {
    id: 2,
    title: 'Темы',
    name: 'themes'
  },
  Groups: {
    id: 3,
    title: 'Сообщества',
    name: 'groups'
  }
}
export default {
  name: 'Top-Header',
  data () {
    return {
      tabs,
      activeTab: tabs.All,
    }
  },
  computed: {},
  methods: {
    setActiveTab (_tab) {
      this.activeTab = _tab
    },

  }
}
</script>

<style scoped lang="scss">
.menu__community {
  display: flex;
  justify-content: space-between;
  background: aliceblue;
  border: 0.1rem solid aliceblue;
  border-radius: 2rem;
  height: 1.8rem;
  width: 18rem;
  font-size: 16px;

  .nuxt-link-exact-active {
    background: #ff0040;
    border-radius: 1rem;
    margin-right: .25rem;
  }

  .view__community {
    color: black;
    text-decoration: none;
    text-align: center;
    font-size: 16px;
    flex: 1;
  }

  .view__community a {
    margin: auto;
  }

  .view__community:hover {
    margin-right: .25rem;
    height: 1.8rem;
    background: #ff0040;
    border-radius: 2rem;
    border-top: 1rem;
  }
}
</style>
