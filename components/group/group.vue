<template>
  <div class="show__groups">
    <nuxt-link :to="/group/" class="links__item">
      <div class="data__groups__info">
        <div class="image">
          <img src="../../static/groups.jpg">
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
        <div class="button__join__groups">
          <button>&plus;
            <span>Join</span>
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
  background: var(--backgroundWhite);
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
          color: var(--colorGray);
        }

        .groups__desc {
          word-wrap: break-word;
          width: 35rem;
          font-weight: 400;
          font-size: 14px;
          color: var(--colorGray);
        }

      }

      .button__join__groups {

      }
    }

}

</style>
