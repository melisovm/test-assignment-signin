<template>
  <div>
    <v-row no-gutters>
      <v-col class="text-field--custom-label text-left ml-3 mb-1">
        {{ label }}
      </v-col>
      <v-col v-if="showTooltip" class="text-right mr-6">
        <v-menu top offset-y>
          <template #activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              size="20"
              v-on="on"
            >
              mdi-help-circle
            </v-icon>
          </template>

          <v-card color="primary white--text rounded px-3 py-2">
            Password must contain 8+ symbols, 1 special and 2 capital letters
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
    <v-text-field
      filled
      rounded
      :class="{ 'error-background': errors.length }"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      :value="value"
      :error-messages="errors"
      @click:append="showPassword = !showPassword"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'PasswordField',

  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },

    showTooltip: {
      type: Boolean,
      default: false
    },

    errors: {
      type: Array,
      default: () => []
    },
  },

  data() {
    return {
      showPassword: false
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/text-field.scss";
</style>

