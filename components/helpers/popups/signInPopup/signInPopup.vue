<template>
  <div class="auth__popup" v-if="isOpen">
    <div class="auth__popup__content">
      <div class="info__block">
        <div class="title__popup">
          <span class="title__name">
            Вход
          </span>
        </div>
        <div class="main">
          <div class="u__name">
            <span class="title__input__field">Имя пользователя</span> <br>

            <div class="u__name__field">
              <input type="text" class="input__name" placeholder="Введите почту"> <br>

            </div>
          </div>
          <div class="u__password">
            <span class="title__input__field">Пароль</span>
            <div class="u__password__field">
              <input type="text" class="input__password" placeholder="Пароль">
            </div>
          </div>
        </div>

        <div class="b__active">
          <div class="u__sign__in">
            <button class="sign__in">
                <span>
                  Вход
                </span>
            </button>
          </div>
          <div class="u__cancellation">
            <button class="cancellation" @click="confirm">
                <span>
                  Отмена
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
  name: 'signInPopup',
  data () {
    return {
      isOpen: false
    }
  },
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
.auth__popup {

  .info__block {

    .title__popup {
      font-size: 30px;
      margin-bottom: 1rem;
    }

    .main {
      vertical-align: center;

      .title__input__field {
        margin-right: 0.5rem;
        font-weight: 200;
        font-size: 18px;
      }

      .u__name {
        margin-bottom: 1rem;
      }
      .u__name, .u__password {
        display: flex;
        align-self: end;

        .u__name__field, .u__password__field {
          margin-left: auto;
        }

        .input__name, .input__password {

          width: 10rem;
          height: 1rem;
          align-items: end;
        }
      }
    }

    .b__active {
      margin-top: 1rem;
      display: flex;
      justify-content: end;

      .u__sign__in {
        margin-right: 0.5rem;

        .sign__in {
          width: 9rem;
          border: 0.03rem solid gray;
          background: var(--background80Red);
          color: var(--text100White);
          padding: 0.3rem;
          border-radius: 0.2rem;
        }
      }

      .u__cancellation {
        .cancellation {
          width: 9rem;
          border: 0.03rem solid gray;
          background: var(--color60);
          color: var(--text100Black);
          padding: 0.3rem;
          border-radius: 0.2rem;
        }
      }

    }
  }
}


</style>
