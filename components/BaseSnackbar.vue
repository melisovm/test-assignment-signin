<template>
  <v-snackbar
    v-model="show"
    :color="notification.color"
    :timeout="3000"
    rounded="pill"
  >
    {{ notification.text }}

    <template #action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="show = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'BaseSnackbar',

  data() {
    return {
      show: true
    }
  },

  computed: {
    ...mapGetters({
      notification: 'notification/notification'
    }),
  },

  watch: {
    show: {
      handler(value) {
        if (!value) {
          this.removeNotification()
        }
      }
    }
  },

  methods: {
    ...mapActions({
      removeNotification: 'notification/remove'
    }),
  }
}
</script>

<style scoped>

</style>
