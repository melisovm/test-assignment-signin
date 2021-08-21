import Vue from "vue";

import { extend, localize, ValidationObserver, ValidationProvider } from "vee-validate";
import { required, email, min, confirmed } from "vee-validate/dist/rules";

const dictionary = {
  en: {
    messages: {
      required: (value) => `${value} is required`,
      email: () => 'Enter valid email',
      confirmed: () => 'Repeat previous password',
      min: (value, args) => {
        return `Field ${value} must contain minimum ${args.length} values`
      },
      password: () => 'Password must contain 8+ symbols, 1 special and 2 capital letters '
    },
  },
};

extend("required", required);

extend("email", email);

extend("min", min);

extend("confirmed", confirmed);

extend('password', {
  validate: value => {
    return (
      /[A-Z]{2,}/.test(value) &&
      /[a-z]/.test(value) &&
      /[!@#$%^&*()_\-+=`~<>?\\/;,.'"\][{}]/.test(value) &&
      value.length > 8
    )
  }
})


localize(dictionary);

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
