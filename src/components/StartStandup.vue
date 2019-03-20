<template>
  <div class="started-call-overlay">
    <button v-on:click="$emit('startStandup')" class="start-standup-btn">Start Standup!</button>
  </div>
</template>

<style lang="scss" scoped>
.started-call-overlay {
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.start-standup-btn {
  background-color: #fff;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  top: 50%;
  position: absolute;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform-origin: 50% 50%;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: #000;
    box-shadow: 1px 2px 2px 1px rgba(0, 0, 0, 0.3);
    font-weight: 500;
  }
}
</style>
