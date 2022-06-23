<template>
  <div
    class="u__comment"
  >
    <div class="u__comment_show"
    >
      {{ comment }}
    </div>
  </div>

</template>

<script>
export default {
  name: 'ShowComment',
  props: {
    comment: {
      type: Object,
      required: true,
      default: ()=>{}
    },
    mounted(){
      console.log(this.comment.children)
    }
  }
}
</script>

<style scoped>

</style>
