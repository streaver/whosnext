<template>
  <div class="extension">
    <div v-if="onCall">
      <h1 class="header header--medium">👩‍💻 Currently on call 👨‍💻</h1>
      <div class="container container--rounded">
        <div id="participants">
          <div v-bind:key="participant.name" v-for="participant in participants" v-bind:class="{ 'speaker-card--spoke': participant.position > current, 'speaker-card--active': participant.  position === current }">
            {{ participant.name }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Currently there is no meet call in progress...</h1>
    </div>
  </div>
</template>

// <script>
export default {
  data() {
    return {
      onCall: true,
      current: 1,
      participants: [
        {
          name: 'Pepe',
          position: 1,
        },
        {
          name: 'Rupert',
          position: 2
        },
        {
          name: 'Gaspar',
          position: 3
        }
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
