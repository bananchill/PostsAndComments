<template>
  <div class="nested__comment__data">
    <div class="nested__comment">
      <div class="u__img__avatar">
        <img :src="comment.owner.avatar_url" alt="" v-if="comment.owner.avatar_url">
        <img src="../../../../static/groups/usersUn.jpg" alt="" v-else>
      </div>
      <div class="info__comment">
        <div class="u__nested__comment">
          <div class="u__name">
            <span class="name">{{ comment.owner.first_name }}</span>
          </div>
          <div class="u__nested__comment__desc">
        <span class="desc">
          {{ comment.text }}
        </span>

          </div>
          <div class="answer__nested__comment">
            <button class="answer">
              Ответить
            </button>
          </div>
        </div>
      </div>

    </div>
    <template v-if="comment.children">
      <div class="next__nested__comment">
        <nested-comment
          v-for="child in comment.children"
          :key="child.id"
          :comment="child"
          :lvlNested="lvlNested + 1"
        />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "nestedComment",
  props: {
    comment: null,
    lvlNested: {
      type: Number
    },
  }
}
</script>

<style scoped lang="scss">
.nested__comment__data {
  margin: 0.5rem 0.5rem 0.5rem 1.5rem;


  .u__img__avatar {
    & img {
      width: 30px;
      height: 30px;
    }
  }

  .nested__comment {
    display: flex;

    .info__comment {
      width: 100%;
      margin-left: 0.5rem;
      background: var(--background70);
      border-radius: 1rem;
      padding: 1rem;

      .u__nested__comment {

        .u__name {
          padding-bottom: 1rem;

          .name {
          }
        }

        .u__nested__comment__desc {
          padding-bottom: 1rem;
          .desc {
          }
        }

        .answer__nested__comment {
          .answer {
            margin: 0.3rem;
            padding: 0.5rem;
            border: none;
            border-radius: 0.3rem;
            font-weight: 600;
            background: darkgray;
          }
        }
      }
    }
  }
  .next__nested__comment{
    width: 110%;
  }
}
</style>
