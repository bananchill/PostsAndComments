<template>
  <div>
    <OneGroup v-if="group" :group="group"/>

  </div>
</template>

<script>

import { convert } from '@/infrastructure/toolkit/transformationJSON'

import OneGroup from '@/components/pages/groups/group/group'

export default {
  name: 'pageOneGroup',
  components: {
    OneGroup
    // groups
  },
  data () {
    return {
      id: this.$route.params.id,
      group: null,
    }
  },
  async mounted () {
    await this.refreshAsync()
  },
  computed: {
    groupsApi () {
      return this.$sApp.interfaces.groupsApi
    },
  },
  methods: {
    async refreshAsync () {
      await this.getGroupAsync()
    },
    async getGroupAsync () {
      try {
        const res = await this.groupsApi.getInfoAsync(this.id)
        this.group = res.group
        console.log( res.group)
      } catch (e) {
        console.error(`get group failed: ${e}`)
      }
    }
  }
}
</script>

<style scoped>

</style>
