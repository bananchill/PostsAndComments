<template>
  <div
    class="user__comment">
    <div class="u__comment_show">
      <div class="user__data">
        <div class="u__img">
          <img :src="comment.owner.avatar_url" alt="" v-if="comment.owner.avatar_url">
          <img src="../../../static/groups/usersUn.jpg" alt="" v-else>
        </div>
        <div class="u__name">
          <span>Отвечает {{ comment.owner.first_name }} </span>
        </div>
      </div>
      <div class="comment__text">
        <span>
          {{ comment.text }}
        </span>
      </div>
    </div>
    <hr class="line__between__comments">
    <div class="u__comment__answer" v-show="!isVisibleAnswer">
      <div class="u__img__answer">
        <img :src="comment.owner.avatar_url" alt="" v-if="comment.owner.avatar_url">
        <img src="../../../static/groups/usersUn.jpg" alt="" v-else>
      </div>
      <div class="description__block__answer" @click="toggleAnswer(true)">
        <span>Комментировать ответ...</span>
      </div>
    </div>
    <div class="user__answer__the__question" v-show="isVisibleAnswer">
      <div class="u__textarea__answer">
        <textarea class="textarea__answer"></textarea>
      </div>
      <div class="user__choose__action">
        <div class="u__close__answer">
          <button class="close__answer" @click="toggleAnswer(false)">
            Отмена
          </button>
        </div>
        <div class="u__accept__answer">
          <button class="accept__answer">
            Отправить
          </button>
        </div>
      </div>
    </div>
    <template v-if="comment.children">
          <div class="nested__comment">
            <NestedComment
              v-for="child in comment.children"
              :key="child.id"
              :comment="child"
              :lvlNested="1"
            />
          </div>
    </template>
  </div>

</template>

<script>
import NestedComment from "@/components/pages/comment/nested/nestedComment";

export default {
  name: 'ShowComment',
  components: {
    NestedComment
  },

  props: {
    comment: null
  },
  data() {
    return {
      isVisibleAnswer: false,
    }
  },
  mounted() {
    // this.comment.forEach((data, ind) =>console.log(data.children))
    console.log(this.comment.children)
  },
  methods: {
    toggleAnswer(_isVisibleAnswer) {
      this.isVisibleAnswer = _isVisibleAnswer
    }
  }
}

</script>

<style scoped lang="scss">
.user__comment {
  margin-top: 1rem;
  border-radius: 0.5rem;
  background: var(--background100);

  .u__comment_show {
    .user__data {
      display: flex;

      .u__name {
        margin-left: 1rem;
        align-self: center;
      }

      .u__img {
        & img {
          border-radius: 0.5rem;
          width: 40px;
          height: 40px;
        }
      }
    }

    .comment__text {
      margin: 0.5rem 0.5rem 0.5rem 1rem;
    }
  }

  .u__comment__answer {
    display: flex;

    .u__img__answer {
      margin: 0.5rem 0 0.3rem 1rem;

      & img {
        width: 30px;
        height: 30px;
        border-radius: 0.5rem;
      }
    }

    .description__block__answer {
      align-self: center;
      margin-left: 1rem;

      & span {
        font-size: 12px;
        font-weight: 200;
        color: var(--color80);
      }
    }
  }

  .line__between__comments {
    background-image: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.2), transparent);
    border: 0;
    height: 1px;
    margin: 22px 0 22px 0;
    box-sizing: content-box;
    display: block;
  }

  .user__answer__the__question {
    .u__textarea__answer {
      margin-left: 1rem;

      .textarea__answer {
        border: solid var(--color80) 0.0003rem;
        border-radius: 0.5rem;
        width: 90%;
        min-height: 5.5rem;
        padding: 0.3rem;
        resize: none;
      }
    }
  }

  .user__choose__action {
    display: flex;
    justify-content: end;
    margin: 0.5rem 1rem 0 0;

    .close__answer, .accept__answer {
      margin: 0.3rem;
      padding: 0.5rem;
      border: none;
      border-radius: 0.3rem;
      font-weight: 500;
    }

    .u__close__answer {
      .close__answer {
        background: var(--background60);
      }
    }

    .u__accept__answer {
      .accept__answer {
        color: var(--text100White);
        background: var(--background80Red);
      }
    }

  }

  .nested__comment{
    width:90%;
  }
}
</style>
