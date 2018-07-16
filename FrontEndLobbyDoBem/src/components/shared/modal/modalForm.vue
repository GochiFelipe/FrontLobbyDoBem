<template>
  <v-layout row justify-center>
    <p v-if="type" @click.stop="dialog = true">
      {{buttonText}}
    </p>
    <!-- alterar esse botão quando houver necessidade de usar o mesmo -->
    <buttonApp v-else
      type="submit"
      styleButton="success"
      alt="login"
      title="Login" 
      :icon="false"
      class="button-component-login"
      @click.stop.native="dialog = true"
    />
    <!-- alterar esse botão quando houver necessidade de usar o mesmo -->
    <v-dialog v-model="dialog" max-width="450">
      <v-card>
        <v-card-title primary-title>
          <h3 class="headline mb-0">
            {{formModalTitle}}
          </h3>
        </v-card-title>
        <v-card-actions>
          <form @submit="checkForm">
            <!-- <appInput :item="input" @input="email=$event"/> -->
            <buttonApp
              type="success" 
              alt="login"
              title="Recuperar" 
              :icon="false"
              class="button-component-modal"
              styleButton="success"
            />
          </form>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  import button from '../button/button.vue'
  // import input from '../input/inputField.vue'
  
  export default {

    components: {
      buttonApp: button
      // appInput: input
    },
    props: {
      buttonText: {
        type: String,
        required: true
      },
      formModalTitle: {
        type: String
      },
      type: {
        type: Boolean,
        required: true
      },
      input: {
        type: Object
      }
    },
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      checkForm (event) {
        event.preventDefault()
        console.log(this.email)
      }
    }
  }
</script>
<style scoped>
  p {
    margin-bottom: 0%;
    cursor: pointer;
  }

  form {
    width: 100%;
    margin: 20px;
  }

  .button-component-modal{
    width: 100% !important;
  }
</style>
