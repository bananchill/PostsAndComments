<template>
  <div class="users__in__group">
    <div class="user__info">
      <div class="user__avatar">
        <img class="show__img" :src="member.avatar_url" v-if="member.avatar_url"/>
        <img class="show__img" src="/static/groups/usersUn.jpg" v-else/>
      </div>
      <div class="user__name">
        {{ member.first_name }}
      </div>
    </div>
    <div class="user__add__friends">
      <button class="button__add">
        <span>&plus;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToSubscribe',
  props: {
    member: null
  },
  methods:{

  }
}
</script>

<style scoped lang="scss">
.users__in__group {
  display: flex;
  justify-content: end;
  align-content: center;
  .user__info {
    padding: 0.5rem 0 0.5rem 0.5rem;
    display: flex;
    width: 100%;

    .user__avatar img {
      width: 3rem;
      height: 3rem;
    }

    .user__name {
      margin: 1rem 0.2rem 0 0.5rem;

    }

  }
  .user__add__friends{
    margin: 1rem 1rem 0 0;
    .button__add{
      padding: 0 0.3rem 0 0.3rem;
      font-weight: 800;
    }
  }


}
</style>
