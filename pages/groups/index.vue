<template>
  <div>
   <div class="show__groups">
      <group
        v-for="group in groups"
        :key="group.id"
        :group="group"
      />
   </div>
  </div>
</template>

<script>

import group from '@/components/group/group'

export default {
  name: 'PAGE-GROUPS',
  components:{
    group
  },
  data () {
    return {
      groups: null,
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
      } catch (e) {
        console.error(`get groups failed: ${e}`)
      }
    }
  }
}
</script>
