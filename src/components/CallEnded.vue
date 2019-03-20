<template>
  <div class="finished-standup-overlay">
    <span class="congrats-banner">Yay! You're done! Good Job 🎉</span>
  </div>
</template>

<script>
import VueConfetti from 'vue-confetti';
import Vue from 'vue';

Vue.use(VueConfetti);

export default {
  mounted() {
    this.startConfetti();
  },

  methods: {
    startConfetti () {
      this.$confetti.start({
        shape: 'rect'
      });
    },

    stopConfetti () {
      this.$confetti.stop();
    }
  },
}
</script>

<style lang="scss" scoped>
.finished-standup-overlay {
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .congrats-banner {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 18px;
    color: #fff;
    text-align: center;
    transform: translateY(-50%) translateX(-50%);
  }
}
</style>
