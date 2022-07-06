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
      <span class="community__title">{{ tab.title }}</span>
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
  background: var(--background100);
  border: 0.1rem solid aliceblue;
  border-radius: 3rem;
  height: 3rem;
  width: 18rem;
  font-size: 16px;

  .nuxt-link-exact-active {
    background: var(--background80Red);
    span{
      color: var(--textOnRed);
    }
  }
  .view__community {
    height: 3rem;
    color: var(--textOnWhite);
    text-decoration: none;
    //text-align: center;
    font-size: 16px;
    border-radius: 3rem;
    flex: 1;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    .community__title{

    }
    &:not(:first-child) {
      color: var(--textOnWhite);
      margin: 0 .25rem 0 .25rem;
    }

    &:hover {
      background: var(--background80Red);
      color: var(--textOnRed);
    }
    &:not(:first-child)  .nuxt-link-exact-active {
      color: var(--textOnRed);
    }


  }
}
</style>
