<template>
  <div
    class="participant"
    v-bind:class="{ 'participant--is-speaking': isSpeaking, 'participant--has-spoken': hasSpoken  }"
  >{{ participant.details.sortKey | prettifyParticipantName }}</div>
</template>

<script>
export default {
  props: ['participant'],

  computed: {
    isSpeaking() {
      return this.participant.isSpeaking;
    },

    hasSpoken() {
      return this.participant.hasSpoken;
    }
  },

  filters: {
    prettifyParticipantName(name) {
      return name.replace(/ spaces.*/, '');
    },
  },
};
</script>

<style lang="scss" scoped>
.participant {
  background-color: rgba(255, 248, 237, 0.5);
  padding: 5px;
  width: 200px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: solid 1px #abb1b3;
  height: 20px;
  font-size: 13px;
  font-weight: 300;
}

.participant--is-speaking {
  border-color: #39b54a;
  background-color: #BfE7C5;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 15px;

  &::before {
    content: '>';
  }
}

.participant--has-spoken {
  color: gray;
  border-color: rgba(255, 248, 237, 0.2);
  background-color: rgba(255, 248, 237, 0.3);
}
</style>
