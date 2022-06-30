<template class="temp">
  <div class="show__group__info">
    <div class="show__group">
      <div class="img__items">
        <div class="img__group">
          <img src="../../../../static/groups/backGroup2.jpg" alt="">
        </div>
        <div class="view__img">
          <img class="show__img" src="../../../../static/groups/groups.png">
        </div>
      </div>
      <div class="group__data">
        <div class="group__title">
          <h2>{{ group.name }}</h2>
        </div>
        <div class="group__desc">
          {{ group.description }}
        </div>
        <div class="group__users">
          <div class="group__users__img">
            <img class="users__img" src="../../../../static/groups/usersUn.jpg" alt="">
          </div>
          <div class="group__users__count">
            <span>{{ group.members_count }}</span> <h6 class="label__users">участников</h6>
          </div>
        </div>
      </div>
      <div class="button_question">
        <button class="user__question">
        <span class="label__button__question">
             Задать вопрос
        </span>

        </button>
      </div>
    </div>
    <div class="all__users__subs">
      <div class="label__blocks">
        <h6>Участники сообщества</h6>
      </div>
      <div class="users__in__group">
        <subscribe v-for="(member, index) in  group.members"
                   :key="index"
                   :member="member"
        />
      </div>
    </div>

  </div>
</template>

<script>

import subscribe from '@/components/helpers/subscribe/subscribe'

export default {
  name: 'OneGroup',
  components: {
    subscribe
  },
  props: {
    group: null
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">

.show__group__info {
  display: flex;

  .show__group {
    align-self: start;
    border-radius: 1rem 1rem 0 0;
    background: var(--background100);
    width: 60%;
    max-height: content-box;
    padding-bottom: 1rem;

    .img__items {
      //padding: 0.5rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;


      .img__group {
        img {
          border-radius: 1rem 1rem 0 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

      }

      .view__img {
        margin: 0 0 1rem 1rem;
        transform: translateY(80%);
        position: absolute;
        border-radius: 0.5rem;

        .show__img {
          width: 6rem;
          height: 6rem;
        }
      }

    }

    .group__data, .group__users {
      margin: 0.5rem;
    }

    .group__data {
      margin: 1rem;
      word-wrap: break-word;

      .group__title {

        font-weight: 300;
      }

    }

    .group__users {
      display: flex;
      justify-content: flex-start;

      .group__users__img {

        .users__img {
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      .group__users__count {
        display: flex;
        margin: 0 0 0 0.5rem;

        .label__users {
          margin: 0.2rem 0 0 0.2rem;
          color: var(--color80);

        }
      }

    }

    .button_question {
      padding: 0;
      margin: 0.5rem;
      justify-content: space-between;

      .user__question {
        border-radius: 0.3rem;
        width: 100%;
        background-color: var(--background100);
      }
    }
  }

  .all__users__subs {
    width: 40%;
    margin-left: 3rem;

    .users__in__group{
      background-color: var(--background100);
      border-radius: 0.5rem;
    }

    .label__blocks {
      & h6 {
        font-size: 1.5rem;
        font-weight: 600;
        line-height: 1.875rem;
      }

    }
  }


}
</style>
