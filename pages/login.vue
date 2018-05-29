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
                <input class="input is-large" type="username" placeholder="Your username" autofocus="" v-model="username" @keypress.enter="signup">
                <p class="help is-danger" v-if="errorUsername">
                  {{ errorUsername }}
                </p>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input is-large" type="password" placeholder="Your password" v-model="password" @keypress.enter="signup">
                <p class="help is-danger" v-if="errorPassword">
                  {{ errorPassword }}
                </p>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input is-large" type="password" placeholder="Confirm password" v-model="confirmPassword" @keypress.enter="signup">
                <p class="help is-danger" v-if="errorConfirmPassword">
                  {{ errorConfirmPassword }}
                </p>
              </div>
            </div>
            <button class="button is-block is-info is-large is-fullwidth" @click="signup">Sign up</button>
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
import axios from '~/plugins/axios'

export default {
  layout: 'login',
  data () {
    return {
      mode: 'Login',
      username: '',
      password: '',
      confirmPassword: '',
      errorUsername: null,
      errorPassword: null,
      errorConfirmPassword: null,
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
    async signup () {
      this.errorUsername = null
      this.errorPassword = null
      this.errorConfirmPassword = null
      if (this.username === '') {
        this.errorUsername = 'This field is required'
      }
      if (this.password === '') {
        this.errorPassword = 'This field is required'
      }
      if (this.errorConfirmPassword === '') {
        this.errorConfirmPassword = 'This field is required'
      }
      if (this.errorConfirmPassword !== '' && this.password !== this.confirmPassword) {
        this.errorConfirmPassword = 'Password is not matched'
      }
      if (this.errorUsername || this.errorPassword || this.errorConfirmPassword) {
        return
      }
      await axios.post('/api/signup', {
        username: this.username,
        password: this.password
      })
      await this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      })
      this.username = ''
      this.password = ''
      this.errorLogin = null
      this.$router.push('/')
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
