<template>
  <div>
    <v-flex class="text-center mx-9 mt-15">
      <div class="primary--text text-title">
        Ready for a great User experience?
      </div>
      <div class="secondary--text">
        Bring your media to the next level!
      </div>
      <v-flex class="mt-8">
        <v-btn to="signup" rounded elevation="1" class="mr-4">Sign Up</v-btn>
        <v-btn fab small color='primary' to="signin" elevation='1'>
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-flex>
    </v-flex>
    <v-img :src="require('~/assets/img/woman.svg')" class="woman_image" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.woman_image {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 0;
}
</style>
