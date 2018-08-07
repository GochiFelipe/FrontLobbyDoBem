<template>
  <div class="login">
    <v-form class="form-component-login" @submit.stop.prevent="login()" lazy-validation>
      <v-text-field
        prepend-icon="account_circle"
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        prepend-icon="lock"
        :append-icon="Locked ? 'far fa-eye-slash' : 'far fa-eye'"
        :append-icon-cb="showPassword"
        v-model="password"
        :type="type"
        :error-messages="passwordErrors"
        label="Password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <appModalForm class="forgot-password" 
          buttonText="Esqueci a Senha" 
          :type="true"
          formModalTitle="Recupere sua Senha!"
        />
      <appButton 
          type="submit"
          styleButton="login"
          alt="login"
          title="ENTRAR" 
          :icon="true"
          class="button-component-login"
        />
    </v-form>
    <p class="singin">Não tenho cadastro. <b>Cadastre-se!</b></p>
    <h3 id="breakLine">OU</h3>
    <div class="social-buttons">
      <appButton type="facebook"
        alt="facebookLogin"
        title="Entrar com Facebook"
        class="facebook-button-component"
        :icon="true"
        size="icon"
        iconClass="fab fa-facebook-f"
        styleButton="facebook"
        src="https://image.flaticon.com/icons/svg/54/54065.svg"
      />
      <appButton type="google"
        alt="googleLogin"
        title="Entrar com Google"
        class="google-button-component"
        :icon="true"
        size="icon"
        iconClass="fab fa-google"
        styleButton="google"
        src="https://png.icons8.com/ios/1600/google-logo.png"
      />
    </div>
  </div>
</template>

<script>
import button from './shared/button/button.vue'
import modalForm from './shared/modal/modalForm.vue'
import { required, minLength, email } from 'vuelidate/lib/validators'
import User from '../domain/user/User.js'
import UserService from '../domain/user/UserService.js'
import PersonService from '../domain/person/PersonService.js'

export default {
  components: {
    appButton: button,
    appModalForm: modalForm
  },

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) }
  },

  data: () => ({
    type: 'password',
    Locked: true,
    email: '',
    password: ''
  }),

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    }
  },

  methods: {

    login () {
      this.user.username = this.email
      this.user.password = this.password
      const authUser = {}
      this.service.login(this.user).then((loginRes) => {
        authUser.data = loginRes.data
        authUser.token = loginRes.data.access_token
        authUser.refreshToken = loginRes.data.refresh_token
        authUser.email = this.user.username
        this.errors = []
        localStorage.setItem('userAuth', JSON.stringify(authUser))
        // this.$router.push('atividades')
        window.location.href = 'http://' + this.getHostName(window.location.href) + '/atividades'
      }).catch(function (err) {
        console.log(err.data)
      })
    },

    getHostName (url) {
      var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
      if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2]
      } else {
        return null
      }
    },

    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
    },
    showPassword (type) {
      if (this.Locked) {
        this.type = 'text'
        this.Locked = !this.Locked
      } else {
        this.type = 'password'
        this.Locked = !this.Locked
      }
    }
  },

  created () {
    this.service = new UserService()
    this.personService = new PersonService()
    this.user = new User()
  }
}
</script>

<style>
@media (max-width: 425px) {  
  .login{
    margin: 20px 0px;
    display: grid;
    grid-template-rows: 50% 5% 20% 50%;
    grid-template-columns: 10% 80% 10%
  }
  .logo-img{
    grid-column-start:2;
    grid-row-start: 1;
    grid-column-end: 3;
    grid-row-end: 2;
    width: 80%;
    margin: 20px;
  }

  .social-buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-column-start: 2;
    grid-row-start: 7;
    grid-column-end: 3;
  }

  .form-component-login{
    grid-column-start: 2;
    grid-row-start: 3;
    grid-column-end: 3;
    display: flex;
    flex-direction: column;
  }
  .button-component-login{
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3;
    justify-self: end;
    width: 100%;
  }
  .forgot-password{
    display: flex;
    justify-content: flex-start;
    font-size: 16px;
    margin-bottom: 5px;
  }
  .facebook-button-component{
    width: 100%;
    margin-bottom: 10px;

  }
  .google-button-component{
    width: 100%;
    margin-top: 10px;
  }
  .singin{
    grid-column-start: 2;
    grid-row-start: 5;
    grid-column-end: 3;
    justify-self: center;
    font-size: 16px;
    margin: 5px 0px;
  }
  #breakLine{
    grid-column-start: 2;
    grid-row-start: 6;
    grid-column-end: 3;
    margin: 20px 0px;
  }
}
@media (min-width: 426px) and (max-width: 768px){
  .login{
    display: grid;
    grid-template-rows: 20% 60% 20%;
    grid-template-columns: 47.5% 5% 47.5%
  }
  .logo-img{
    grid-column-start:2;
    grid-row-start: 1;
    grid-column-end: 3;
    grid-row-end: 2;
    width: 80%;
    margin: 20px;
  }

  .social-buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-column-start: 3;
    grid-row-start: 2;
    grid-column-end: 4;
    margin: 30px;
  }

  .form-component-login{
    grid-column-start: 1;
    grid-row-start: 2;
    grid-column-end: 2;
    display: flex;
    flex-direction: column;
    margin: 30px;
  }
  .button-component-login{
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3;
    justify-self: end;
    width: 100%;
  }
  .forgot-password{
    grid-column-start: 2;
    grid-row-start: 4;
    grid-column-end: 3;
    grid-row-end: 5;
    font-size: 16px;
    justify-self: start;
    margin: 16px 0px 16px;
  }
  .facebook-button-component{
    width: 100%;
    margin-bottom: 10px;

  }
  .google-button-component{
    width: 100%;
    margin-top: 10px;
  }
  .singin{
    grid-column-start: 1;
    grid-row-start: 2;
    grid-column-end: 2;
    justify-self: center;
    align-self: flex-end;
    font-size: 16px;
    margin-bottom: 0px;
  }

  #breakLine{
    grid-column-start: 2;
    grid-row-start: 2;
    grid-column-end: 3;
    justify-content: center;
    align-self: center;
  }
}
@media (min-width: 769px){
  .login{
    display: grid;
    grid-template-rows: 20% 60% 20%;
    grid-template-columns: 47.5% 5% 47.5%
  }
  .logo-img{
    grid-column-start:2;
    grid-row-start: 1;
    grid-column-end: 3;
    grid-row-end: 2;
    width: 80%;
    margin: 20px;
  }

  .social-buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-column-start: 3;
    grid-row-start: 2;
    grid-column-end: 4;
    margin: 15% 30% 15% 0%;
  }

  .form-component-login{
    grid-column-start: 1;
    grid-row-start: 2;
    grid-column-end: 2;
    display: flex;
    flex-direction: column;
    margin: 15% 0% 15% 30%;
  }
  .button-component-login{
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3;
    justify-self: end;
    width: 100%;
  }
  .forgot-password{
    grid-column-start: 2;
    grid-row-start: 4;
    grid-column-end: 3;
    grid-row-end: 5;
    font-size: 16px;
    justify-self: start;
    margin: 16px 0px 16px;
  }
  .facebook-button-component{
    width: 100%;
    margin-bottom: 10px;

  }
  .google-button-component{
    width: 100%;
    margin-top: 10px;
  }
  .singin{
    grid-column-start: 1;
    grid-row-start:2;
    grid-column-end: 2;
    justify-self: center;
    align-self: flex-end;
    font-size: 16px;
    margin-bottom: 10%;
    margin-left: 35%;
  }

  #breakLine{
    grid-column-start: 2;
    grid-row-start: 2;
    grid-column-end: 3;
    justify-content: center;
    align-self: center;
  }
}
</style>
