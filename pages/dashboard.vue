<template>
  <div>
    <v-flex class="text-center mx-9 mt-15">
      <div class="primary--text text-title">
        Hello, John Doe!
      </div>
    </v-flex>
    <v-img :src="require('~/assets/img/dashboard-woman.svg')" class="woman_image" />
  </div>
</template>

<script>
export default {
  name: 'Dashboard',

  middleware: 'auth'
}
</script>

<style scoped>

</style>
