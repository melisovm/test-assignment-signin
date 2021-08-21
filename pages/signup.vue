<template>
  <v-flex class="mx-2 text-center mt-15">
    <h1 class="primary--text text-title">
      Sign Up
    </h1>
    <v-card class="px-10 pt-5 pb-4 mt-5">
      <ValidationObserver ref="signUpForm" v-slot="{ invalid }">
        <v-form @submit.prevent="onSubmit">
          <div>
            <div class="text-field--custom-label text-left ml-3 mb-1">Full name</div>
            <ValidationProvider v-slot="{ errors }" rules="required" name="Full name" vid="full_name">
              <v-text-field v-model="form.full_name" :class="{ 'error-background': errors.length }" filled rounded :error-messages="errors" />
            </ValidationProvider>
          </div>
          <div>
            <div class="text-field--custom-label text-left ml-3 mb-1">Email</div>
            <ValidationProvider v-slot="{ errors }" rules="required|email" name="Email" vid="Email">
              <v-text-field v-model="form.email" :class="{ 'error-background': errors.length }" filled rounded :error-messages="errors" />
            </ValidationProvider>
          </div>

          <ValidationProvider v-slot="{ errors }" rules="required|password" name="Password">
            <PasswordField v-model="form.password" :errors="errors" label="Password" :show-tooltip="true" />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="required|confirmed:Password" name="Repeat Password">
            <PasswordField v-model="form.confirm_password" :errors="errors" label="Repeat password" class="mb-1" />
          </ValidationProvider>
          <v-btn color="primary" :disabled="invalid" type="submit" rounded block>
            Sign Up
          </v-btn>
        </v-form>
      </ValidationObserver>
    </v-card>

    <v-flex class="mt-5 mb-8 mx-12"> Already have an account? <span class="link_button" @click="$router.push('signin')"> Sign In </span></v-flex>
  </v-flex>
</template>

<script>
import { mapActions } from 'vuex'
import PasswordField from '~/components/Fields/PasswordField'

export default {
  name: 'Signup',

  components: {
    PasswordField
  },

  data() {
    return {
      form: {
        full_name: '',
        email: '',
        password: '',
        confirm_password: ''
      }
    }
  },

  methods: {
    ...mapActions({
      openNotification: 'notification/open'
    }),

    async onSubmit() {
      const valid = await this.$refs.signUpForm.validate()

      try {
        if (valid) {
          // eslint-disable-next-line camelcase
          const { confirm_password, ...restForm } = this.form
          await this.$axios.post('/auth/register', {
            ...restForm
          })

          this.openNotification({
            color: 'success',
            text: 'You have registered successfully'
          })

          this.form = {
            full_name: '',
            email: '',
            password: '',
            confirm_password: ''
          }

          this.$refs.signUpForm.reset()
        }
      } catch ({ response }) {
        if (response.status === 401) {
          this.openNotification({
            color: 'error',
            text: 'Such email is already exists'
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/text-field.scss";
</style>
