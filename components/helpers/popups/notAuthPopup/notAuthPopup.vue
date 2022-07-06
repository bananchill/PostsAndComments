<template>
  <div class="not__auth__popup" v-if="isOpen">
    <div class="not__auth__popup__content">
      <div class="close__popup">
        <button
          @click="close()"
          class="button__close"
        ><h2>&times;</h2>
        </button>
      </div>
      <div class="info__block">
        <div class="u__name">
          <h3>Добро пожаловать</h3>
        </div>
        <div class="u__password">
        <span>Зайдите на сайт, чтобы откыть возможность<br>
        для ответа на вопросы и многое другое ...</span>
        </div>
        <div class="u__auth">
          <div class="u__sign__in">
            <button class="sign__in">
                <span>
                  Зарегистрироваться
                </span>
            </button>
          </div>
          <div class="u__cancellation">
            <button class="cancellation" @click="confirm">
                <span>
                  Войти
                </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'notAuthPopup',
  popupController: null,
  data () {
    return {
      isOpen: false
    }
  },
  created () {
  }
  ,
  mounted () {
    document.addEventListener('keydown', this.handleKeyDown)
  },
  beforeUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    handleKeyDown (e) {
      if (this.isOpen && e.key === 'Escape') {
        this.close()
      }
    },
    open () {
      let resolve
      let reject
      const popupPromise = new Promise((ok, fail) => {
        resolve = ok
        reject = fail
      })

      this.$options.popupController = {
        resolve,
        reject
      }

      this.isOpen = true
      return popupPromise
    },
    confirm () {
      this.$options.popupController.resolve(true)
      this.isOpen = false
    }
    ,
    close () {
      this.$options.popupController.resolve(false)
      this.isOpen = false
    }
  }
}
</script>

<style scoped lang="scss">
.not__auth__popup {

  .not__auth__popup__content {
    .close__popup {
      text-align: right;
      font-weight: 800;

      .button__close {
        border: none;
        background: none;
      }
    }

    .info__block {
      .u__name {
        font-weight: 400;
        margin-bottom: 1rem;
      }

      .u__password {

        & span {
          font-weight: 300;
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
      }

      .u__auth {
        margin-top: 1rem;

        .u__sign__in {
          .sign__in {
            width: 9rem;
            background: var(--background80Red);
            color: var(--text100White);
            padding: 0.3rem;
            border: none;
            border-radius: 0.2rem;
          }
        }

        .u__cancellation {
          .cancellation {
            width: 9rem;
            background: var(--color60);
            color: var(--text100Black);
            padding: 0.3rem;
            border: none;
            border-radius: 0.2rem;
          }
        }

      }
    }
  }
}


</style>
