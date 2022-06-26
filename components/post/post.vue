<template>
  <div class="data__wrapper" v-if="post">
    <div class="data__item">
      <div class="s__question">
        <nuxt-link :to="`/post/${post.id}`" class="links__item ">
          <h3>
            <span> {{ post.name }} </span>
          </h3>
          <div class="data__text">
            <span> {{ post.text }} </span>
          </div>
        </nuxt-link>
        <div class="user">
          <div class="image">
            <img src="../../static/icon_user.png" alt="">
          </div>
          <div class="u__answer__button">
            <div class="user__about">
              <div class="user__quest">
                <span> Спрашивает </span>
                {{ post.owner.first_name }}
              </div>
              <div class="user__name">
                {{ post.owner.first_name }}
              </div>
            </div>
          </div>
          <div class="button__label">
            <button class="question__button">
              <span> Ответить </span>
            </button>
          </div>
        </div>
        <div class="u__answer">
          <div class="u__answer__editor__textarea">
          <textarea id="story" name="story" placeholder="Введите ответ">
      </textarea>
          </div>
        </div>
        <comment v-show="post.comments"
                 :comment="post.comments"
        />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'OnePost',
  components: {},
  props: {
    post: {
      type: [Object, null],
      required: true,
      default: null
    },
  },
  data () {
    return {
      path: this.$route.path,
      id: this.$route.params.id
    }
  },
  mounted () {
    this.transDataJson()
  },
  methods: {
    transDataJson () {

    }
  }
}
</script>

<style scoped lang="scss">
.data__wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  --layout-padding: 1.875rem;
  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;

  .data__item {
    background-color: var(--textOnRed);
    /* Inside auto layout */
    border-radius: 0.625rem;
    .s__question {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-radius: 1rem;

      & h3 {
        font-size: 1.75rem;
      }

      .user {
        align-items: center;
        display: flex;
        object-fit: cover;
        padding: 0.5rem;


        .user__about {
          padding: 0 0 0 0.5rem;
        }

        .user__name {
          padding: 0.1rem;
          font-size: small;
        }
      }

      .button__label {
        display: flex;
        align-content: center;
        justify-content: flex-end;
        padding: 0 0.625rem 0.625rem;

        .question__button {
          padding: 0 0.2rem;
          border: none;
          background: var(--backgroundComp);
          margin-right: 0.5rem;
          height: 2rem;
          border-radius: 0.3rem;

          &:hover {
            filter: brightness(1);
          }
        }

        & span {
          color: var(--textOnRed);
        }
      }

      .u__answer {
        position: relative;
        margin: 1.25rem 0 0 1rem;

        #story {
          border-radius: 0.5rem;
          width: 100%;
          min-height: 5.5rem;
          height: 100%;
        }
      }
    }
  }

  &:not(:first-child) {
    margin-top: 2rem;
  }
}

</style>
