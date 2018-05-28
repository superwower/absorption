<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">absorption</h3>
          <div class="box" v-if="mode === 'Login'">
            <figure class="avatar"></figure>
            <div class="field">
              <div class="control">
                <input class="input is-large" type="username" placeholder="Your username" autofocus="" v-model="username" @keypress.enter="login">
                <p class="help is-danger" v-if="errorUsername">
                  {{ errorUsername }}
                </p>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input is-large" type="password" placeholder="Your password" v-model="password" @keypress.enter="login">
                <p class="help is-danger" v-if="errorPassword">
                  {{ errorPassword }}
                </p>
              </div>
            </div>
            <button class="button is-block is-info is-large is-fullwidth" @click="login">Login</button>
            <p class="help is-danger" v-if="errorLogin">
              {{ errorLogin }}
            </p>
          </div>
          <div class="box" v-else>
            <figure class="avatar"></figure>
            <div class="field">
              <div class="control">
                <input class="input is-large" type="username" placeholder="Your username" autofocus="" v-model="username" @keypress.enter="login">
                <p class="help is-danger" v-if="errorUsername">
                  {{ errorUsername }}
                </p>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input is-large" type="password" placeholder="Your password" v-model="password" @keypress.enter="login">
                <p class="help is-danger" v-if="errorPassword">
                  {{ errorPassword }}
                </p>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input is-large" type="password" placeholder="Confirm password" v-model="confirmPassword" @keypress.enter="login">
                <p class="help is-danger" v-if="errorPassword">
                  {{ errorPassword }}
                </p>
              </div>
            </div>
            <button class="button is-block is-info is-large is-fullwidth" @click="login">Sign up</button>
            <p class="help is-danger" v-if="errorLogin">
              {{ errorLogin }}
            </p>
          </div>
          <p class="has-text-grey">
              <a @click="switchMode('Login')">Login</a> &nbsp;·&nbsp;
              <a @click="switchMode('Sign up')">Sign Up</a> 
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'login',
  data () {
    return {
      mode: 'Login',
      username: '',
      password: '',
      errorUsername: null,
      errorPassword: null,
      errorLogin: null
    }
  },
  methods: {
    async login () {
      try {
        this.errorUsername = null
        this.errorPassword = null
        this.errorLogin = null
        if (this.username === '') {
          this.errorUsername = 'This field is required'
        }
        if (this.password === '') {
          this.errorPassword = 'This field is required'
        }
        if (this.errorUsername || this.errorPassword) {
          return
        }
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })
        this.username = ''
        this.password = ''
        this.errorLogin = null
        this.$router.push('/')
      } catch (e) {
        this.errorLogin = e.message
      }
    },
    switchMode (newMode) {
      this.mode = newMode
    }
  },
  head () {
    return {
      title: `login`
    }
  }
}
</script>

<style scoped>
</style>
