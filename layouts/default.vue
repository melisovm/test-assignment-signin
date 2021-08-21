<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <BaseSnackbar v-if='notification' />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseSnackbar from '@/components/BaseSnackbar'

export default {
  components: {
    BaseSnackbar,
  },

  computed: {
    ...mapGetters({
      notification: 'notification/notification'
    })
  }
}
</script>
