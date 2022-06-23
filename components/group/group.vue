<template>
  <div class="show__groups">
    <div class="groups__item">
      <div class="groups__data__show">
        <div class="groups__title">
          {{ group.name }}
        </div>
        <div class="groups__desc">
          {{ group.description }}
        </div>
        <div class="groups__subscribers">
          {{ group.members_count }} Подписчика
        </div>
      </div>
    </div>
    <div/>
  </div>
</template>

<script>

export default {
  name: 'ToGroup',
  props: {
    group: {
      type: [Object, null],
      required: true,
      default: null
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
.show__groups {
  width: 600px;
  background: darkgrey;
  border: 1rem;

  .groups__item {
    .groups__data__show {
      .groups__desc {
      }
    }
  }

}

</style>
