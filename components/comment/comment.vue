<template>
  <div></div>
</template>

<script>
export default {
  name: 'ShowComment',
  props: {
    comment: {
      type: [Object, null],
      required: true,
      default: null
    },
    mounted(){
      console.log(this.comment)
    }
  }
}
</script>

<style scoped>

</style>
