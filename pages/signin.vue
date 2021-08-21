<template>
  <v-flex class="mx-2 text-center mt-15">
    <h1 class="primary--text text-title">
      Sign In
    </h1>
    <v-card class="px-10 pt-5 pb-4 mt-5">
      <ValidationObserver ref="signInForm" v-slot="{ invalid }">
        <v-form @submit.prevent="onSubmit">
          <div>
            <div class="text-field--custom-label text-left ml-3 mb-1">Email</div>
            <ValidationProvider v-slot="{ errors }" rules="required|email" name="Email" vid="Email">
              <v-text-field v-model="form.email" :class="{ 'error-background': errors.length }" filled rounded :error-messages="errors" />
            </ValidationProvider>
          </div>

          <ValidationProvider v-slot="{ errors }" rules="required" name="Password">
            <PasswordField v-model="form.password" :errors="errors" label="Password" :show-tooltip="false" />
          </ValidationProvider>
          <v-btn color="primary" :disabled="invalid" type="submit" rounded block>
            Sign In
          </v-btn>
        </v-form>
      </ValidationObserver>
    </v-card>

    <v-flex class="mt-5 mb-8 mx-12"> Don’t have an account yet? <span class="link_button" @click="$router.push('signup')"> Sign Up </span></v-flex>
  </v-flex>
</template>

<script>
import { mapActions } from 'vuex'
import PasswordField from '~/components/Fields/PasswordField'

export default {
  name: 'Signin',

  components: {
    PasswordField,
  },

  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions({
      openNotification: 'notification/open'
    }),

    async onSubmit() {
      const valid = this.$refs.signInForm.validate()

      if (valid) {
        try {
          await this.$auth.loginWith('local', {
            data: { email: this.form.email, password: this.form.password }
          })

          await this.$router.push('/dashboard')
        } catch ({ response }) {
          if (response.status === 401) {
            this.openNotification({
              color: 'error',
              text: 'Wrong password or email'
            })
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
