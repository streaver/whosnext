<template>
  <div v-if="isLoading" class="loading-overlay">
    <h1 class="header white-color centered">{{ header }}</h1>
    <div class="loader white-color">Loading...</div>
    <h2 class="white-color centered font-light">{{ subHeader }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      default: 'Stay tight...',
    },
    subHeader: {
      type: String,
      default: 'Looking for meet calls...',
    },
    isLoading: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.centered {
  text-align: center;
}

.white-color {
  color: #fff;
}

.font-light {
  font-weight: 200;
}

.loading-overlay {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(45deg, #25a5c8 0%, #39b54a 65%);
  z-index: 999999;
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  font-size: 10px;
  margin: 60px auto 90px;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
