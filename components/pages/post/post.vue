<template>
  <div class="data__wrapper" v-if="post">
    <div class="data__item">
      <div class="s__question">

        <nuxt-link :to="`/post/${post.id}`" class="links__item ">
          <div class="posts__avatar" v-if="post.image_url">
            <img :src="post.image_url" alt="" class="avatar">
          </div>
          <div class="post__title">
            <h3>
              <span> {{ post.name }} </span>
            </h3>
          </div>
          <div class="data__text">
            <span> {{ post.text }} </span>
          </div>
        </nuxt-link>
        <div class="user">
          <div class="image">
            <img :src="post.owner.avatar_url" alt="" v-if="post.owner.avatar_url">
            <img src="../../../static/groups/usersUn.jpg" alt="" v-else>
          </div>

          <div class="u__answer">
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
            <button class="question__button" @click="visibleAnswerButtonImpl(isVisibleAnswerButton)">
              <span> Ответить </span>
            </button>
          </div>
        </div>
        <div class="u__answer__div" v-show="isVisibleAnswerButton">
          <div class="u__answer__editor__textarea">
             <textarea class="story"
                       name="story"
                       placeholder="Введите ответ"
             >
          </textarea>
          </div>
          <div class="u__answer__button">
            <button class="answer__button">
              <span> Отправить </span>
            </button>
          </div>
        </div>
      </div>

    </div>
    <template v-if="post.comments  && post.comments.children">
      <div class="user__comment">
        <ShowComment v-for="comment in post.comments.children"
                     :comment="comment"
                     :key="comment.id"
                     class="post__comment"
        />
      </div>
    </template>

  </div>

</template>

<script>

import ShowComment from '@/components/pages/comment/comment'

export default {
  name: 'AllPost',
  components: {ShowComment},
  props: {
    post: {
      type: [Object, null],
      required: true,
      default: null
    },
  },
  data() {
    return {
      path: this.$route.path,
      id: this.$route.params.id,
      isVisibleAnswerButton: false,
    }
  },
  mounted() {

  },
  methods: {
    visibleAnswerButtonImpl: (_isVisible) => {
      if (this.isAuthAccount())
        this.isVisibleAnswerButton = !_isVisible
      else
        this.sendAnswer()
    },
    isAuthAccount: () => {
      return false;
    }
    ,
    sendAnswer: () => {
      this.$eventBus.$emit('my-custom-event')
    }
  }
}
</script>

<style scoped lang="scss">
.data__wrapper {
  display: flex;
  flex-direction: column;

  order: 1;
  flex-grow: 0;

  .data__item {
    background-color: var(--text100White);
    border-radius: 0.625rem;


    .s__question {
      margin: 0.2rem 0 1rem;
      display: flex;
      flex-direction: column;
      border-radius: 1rem;
      width: 100%;

      .links__item {

        .posts__avatar {
          height: 9rem;
          margin: 0;

          .avatar {
            border-radius: 0.625rem;
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }

        .data__text {
          margin: 0.5rem 0 0.5rem 1rem;
          overflow-wrap: break-word;
          padding-right: 1rem;
        }

        .post__title {
          margin: 0.5rem 1rem 0.5rem 1rem;
        }
      }

      & h3 {
        font-size: 1.75rem;
      }

      .user {
        display: flex;
        align-content: center;
        object-fit: cover;
        padding: 0.5rem;
        width: 100%;


        & img {
          border-radius: 1.5rem;
        }


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
        align-self: center;
        justify-content: flex-end;
        padding: 0 0.625rem 0.625rem;

        .question__button {
          padding: 0 0.2rem;
          border: none;
          background: var(--background80Red);
          margin-right: 0.5rem;
          height: 2rem;
          border-radius: 0.3rem;

          &:hover {
            filter: brightness(1);
          }
        }

        & span {
          margin: 0.5rem;
          color: var(--text100White);
        }
      }

      .u__answer {

        position: relative;
        margin: 1.25rem 0 0 1rem;
        width: 70%;
      }

      .u__answer__div {
        position: relative;
        margin: 1.25rem 0 0 1rem;
        width: 90%;

        .story {
          border-radius: 0.5rem;
          width: 100%;
          min-height: 5.5rem;
          margin: 0 1rem 0 0.5rem;
          padding: 0.3rem;
          height: 100%;
          resize: none;
        }

        .u__answer__button {
          display: flex;
          align-content: center;
          justify-content: flex-end;

          .answer__button {
            padding: 0 0.2rem;
            border: none;
            background: var(--background80Red);
            margin: 0.5rem;
            height: 2rem;
            border-radius: 0.3rem;

            span {
              margin: 0.5rem;
              color: var(--text100White);
            }
          }
        }
      }
    }
  }

  &:not(:first-child) {
    margin-top: 2rem;
  }


}

.post__comment {
  padding: 1rem;
}

</style>
