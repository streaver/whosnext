<template>
  <div>
    <div
      class="participant"
      v-bind:class="{ 'participant--is-speaking': isSpeaking, 'participant--has-spoken': hasSpoken  }"
    >{{ participant.details.sortKey | prettifyParticipantName }}</div>

    <button v-if="amIcurrentSpeaker" v-on:click="giveMicNextSpeaker" class="btn-next">Next</button>
  </div>
</template>

<script>
import BackgroundPopupCommunicationService from '../services/background-popup-communication';
import Participant from '../database/participant';

export default {
  props: ['participant'],

  computed: {
    isSpeaking() {
      return this.participant.isSpeaking;
    },

    hasSpoken() {
      return this.participant.hasSpoken;
    },

    amIcurrentSpeaker() {
      return this.participant.id === this.myId && this.participant.isSpeaking;
    },
  },

  filters: {
    prettifyParticipantName(name) {
      return name.replace(/ spaces.*/, '');
    },
  },

  created() {
    this.myId = BackgroundPopupCommunicationService.getParticipantId();
  },

  methods: {
    giveMicNextSpeaker() {
      const meetingId = BackgroundPopupCommunicationService.getMeetingId();

      new Participant(this.myId, meetingId, {}).update({ hasSpoken: true, isSpeaking: false });

      this.$emit('setNextSpeaker');
    },
  },
};
</script>

<style lang="scss" scoped>
.participant {
  background-color: rgba(98, 197, 57, 0.65);
  background-color: #bfe7c5;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: solid 1px #abb1b3;
  height: 20px;
  font-size: 13px;
  font-weight: 300;
  width: 73%;
  margin-right: 10px;
  display: inline-block;
}

.participant--is-speaking {
  background-color: #e0f3e3;
  font-size: 14px;
  font-weight: 400;
  margin-left: 5px;
  border: 1px solid #39b54a;
  box-shadow: 0px 0px 8px 4px #39b54a;

  &::before {
    content: '>';
  }
}

.participant--has-spoken {
  color: gray;
  border-color: rgba(234, 231, 226, 0.2);
  background-color: rgba(234, 231, 226, 0.3);
}

.btn-next {
  width: 40px;
  height: 25px;
  background-color: #39b54a;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  border: 1px solid #34aa44;
  font-weight: 500;
  outline: none;

  &:hover {
    background-color: #4ac45a;
    border: 1px solid #40b24f;
    outline: none;
  }
}
</style>
