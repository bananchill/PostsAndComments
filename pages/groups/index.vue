<template>
  <div>
    <div class="tabs">
      <div class="show__tabs">
        <span class="tab__title">Все сообщества </span>
        <span class="tab__count"> {{ len }}</span>
      </div>
    </div>
    <div class="show__groups">
      <groups
        v-for="group in groups"
        :key="group.id"
        :group="group"
      />
    </div>
  </div>
</template>

<script>

import groups from '@/components/pages/groups/groups'

export default {
  name: 'PAGE-GROUPS',
  components: {
    groups
  },
  data () {
    return {
      groups: null,
      len: 0,
    }
  },
  computed: {
    groupsApi () {
      return this.$sApp.interfaces.groupsApi
    },
  },
  async mounted () {
    await this.refreshAsync()
  },
  methods: {
    async refreshAsync () {
      await this.getGroupsAsync()
    },
    async getGroupsAsync () {
      try {
        const res = await this.groupsApi.getListAsync()
        this.groups = res.items
        this.len = res.items.length
      } catch (e) {
        console.error(`get groups failed: ${e}`)
      }
    }
  }
}
</script>
<style append lang="scss">
.tabs{
  width: 10rem;
  margin-bottom: 2rem;
  .show__tabs {
    background-color: var(--background100);
    border-radius: 1rem;
    .tab__title{
      margin: 0.1rem 0 0.1rem 0.7rem;
      font-weight: 600;
    }
    .tab__count{
      color: var(--colorGray) ;
      font-weight: 300;
      line-height: 20px;
      font-family: 'TT Norms';
      font-style: normal;
    }
  }

}



</style>
