<template>
  <div class="show__groups">
    <nuxt-link :to="`/groups/group/${group.id}`" class="links__item">
      <div class="data__groups__info">
        <div class="image">
          <img src="../../../static/groups/groups.jpg">
        </div>
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
        <div v-if="!group.is_subscribed" class="button__join__groups">
          <button class="button__group" type="button">&plus;
            <span class="button__label">Подписаться</span>
          </button>
        </div>
        <div v-else class="button__signatory__groups">
          <button class="button__group" type="button">&bigvee;
            <span class="button__label">Вы Подписаны</span>
          </button>
        </div>
      </div>
    </nuxt-link>
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
  background: var(--background100);
  border: 1rem;
  border-radius: 0.625rem;
  padding: 0.5rem 1rem;
  width: 100%;

  .data__groups__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem auto;
    grid-gap: 1rem;
    gap: 1rem;
    border-radius: 0;


    .groups__data__show {
      .groups__subscribers {
        font-weight: 400;
        color: var(--color80);
      }

      .groups__desc {
        word-wrap: break-word;
        width: 35rem;
        font-weight: 400;
        font-size: 14px;
        color: var(--color80);
      }

    }

    .button__signatory__groups, .button__join__groups {
      margin: 0.5rem;
      background: #efefef;
      height: 2rem;

    }

    .button__signatory__groups {
      max-width: 10.5rem;
    }

    .button__join__groups {
      //width: 100%;
      max-width: 9.875rem;
    }

    .button__group {
      border: none;
      height: 2rem;

      .button__label {
        padding-left: 0.5rem;
        white-space: nowrap;
        flex-grow: unset;
      }
    }
  }

}

</style>
