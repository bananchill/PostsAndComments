<template>
  <div class="data__wrapper" v-if="post">
    <div class="data__item">
      <nuxt-link :to="`/post/${post.id}`" class="router__post ">
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
        <button class="question__button" @click="openAnswer()"><span> Ответить </span></button>
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
    transDataJson(){


    }
  }
}
</script>

<style scoped lang="scss">
.data__wrapper {
  display: block;
  flex-row: row;
  flex-basis: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 500px;
  min-width: 400px;
  word-break: break-all;

  .data__item {
    padding: 0 0.2rem 0.2rem 0.3rem;
    border: 0.2rem solid black;
    border-radius: 0.3rem;
    margin-top: 0.2rem;

    .router__post {
      cursor: default;
      color: black;
      text-decoration: none;
    }

    .user {
      align-items: center;
      display: flex;
      object-fit: cover;
      padding: 0.5rem;

      .image img {
        width: 40px;
        height: 40px;
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
      align-content: center;
      justify-content: flex-end;
      padding: 0 0.625rem 0.625rem;

      .question__button {
        padding: 0 0.2rem;
        border: none;
        background: crimson;
        margin-right: 0.5rem;
        height: 2rem;
        border-radius: 0.3rem;
      }

      .question__button:hover {
        background: #ff0040;
      }

      span {
        color: white;
      }
    }

    .u__answer {
      position: relative;
      margin: 1.25rem 0 0 1rem;

      .u__answer__editor__textarea {

        padding-right: 2rem;
      }

      #story {
        border-radius: 0.5rem;
        width: 100%;
        min-height: 5.5rem;
        height: 100%;
      }
    }
  }
}
</style>
