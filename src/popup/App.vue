<template>
  <div class="extension">
    <Loading v-bind:is-loading="isLoading"></Loading>

    <div v-if="callIsInProgress" class="particles-bg">
      <StartStandup
        v-if="!isStandupStarted && !haveAllParticipantsSpoken"
        @startStandup="updateNextSpeaker"
      ></StartStandup>

      <CallEnded v-if="haveAllParticipantsSpoken"></CallEnded>

      <div class="header-container">
        <h1 class="header header--medium white-color">👩‍💻 Currently on call 👨‍💻</h1>
      </div>
      <div class="container rounded-border-3">
        <h3>Participants</h3>

        <div id="participants">
          <Participant
            v-for="participant in participantsSorted"
            v-bind:key="participant.details.sortKey"
            v-bind:participant="participant"
            @setNextSpeaker="updateNextSpeaker"
          ></Participant>
        </div>
      </div>
    </div>
    <div v-else>
      <StartCall></StartCall>
    </div>

    <span class="powered-by">
      Powered by
      <i>
        <a href="https://www.streaver.com" target="_blank">Streaver.</a>
      </i>
    </span>
  </div>
</template>

<script>
import database from '../database/index';
import Loading from '../components/Loading';
import Participant from '../components/Participant';
import StartCall from '../components/StartCall';
import StartStandup from '../components/StartStandup';
import CallEnded from '../components/CallEnded';

import BackgroundPopupCommunicationService from '../services/background-popup-communication';
import ParticipantModel from '../database/participant';

export default {
  components: {
    Loading,
    Participant,
    StartCall,
    StartStandup,
    CallEnded,
  },

  data() {
    return {
      current: 0,
      isLoading: null,
      participants: [],
    };
  },

  computed: {
    callIsInProgress() {
      return this.participants.length > 0;
    },

    participantsSortedByPosition() {
      return this.participants.sort((a, b) => {
        return a.position - b.position;
      });
    },

    speakingParticipant() {
      return this.participants.filter(participant => participant.isSpeaking);
    },

    participantsThatHadSpoken() {
      return this.participantsSortedByPosition.filter(participant => participant.hasSpoken);
    },

    participantsToSpeak() {
      return this.participantsSortedByPosition.filter(participant => !participant.hasSpoken && !participant.isSpeaking);
    },

    participantsSorted() {
      return [].concat(this.participantsThatHadSpoken, this.speakingParticipant, this.participantsToSpeak);
    },

    isStandupStarted() {
      return this.speakingParticipant.length > 0;
    },

    haveAllParticipantsSpoken() {
      return this.participantsThatHadSpoken.length === this.participants.length;
    },
  },

  filters: {
    prettifyParticipantName(name) {
      return name.replace(/ spaces.*/, '');
    },
  },

  methods: {
    updateNextSpeaker() {
      const meetingId = BackgroundPopupCommunicationService.getMeetingId();
      const firstParticipant = this.participantsToSpeak[0];

      if (firstParticipant) {
        new ParticipantModel(firstParticipant.id, meetingId, {}).update({ isSpeaking: true });
      }
    },
  },

  created() {
    const meetingId = BackgroundPopupCommunicationService.getMeetingId();
    this.myId = BackgroundPopupCommunicationService.getParticipantId();

    if (meetingId) {
      this.isLoading = true;

      database
        .collection('meetings')
        .doc(meetingId)
        .collection('participants')
        .onSnapshot(collection => {
          this.participants = collection.docs.map(participantDoc => Object.assign(participantDoc.data(), { id: participantDoc.id }));

          // When subscribing always returns the whole result which can be empty if I'm the first participant on call
          if (this.participants.length > 0) {
            this.isLoading = false;
          } else {
            setTimeout(() => {
              this.isLoading = false;
            }, 4000);
          }
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.extension {
  background-color: #39b54a;
  min-height: 300px;
  height: 100%;
  width: 350px;
}

.particles-bg {
  background-image: url('~/popup/images/particles-white.png');
  background-size: cover;
}

.container {
  background-color: rgba(255, 255, 255, 0.2);
  margin: auto;
  margin-top: 20px;
  padding: 10px;
  min-height: 250px;
  width: 280px;
  margin-bottom: 30px;
}

.rounded-border-3 {
  border-radius: 3px;
}

#participants {
  margin-left: 10px;
}

.header-container {
  height: 70px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
}

.header {
  padding-top: 20px;
  font-weight: 400;
  text-align: center;
}

.header--medium {
  font-size: 22px;
}

.powered-by {
  font-size: 8px;
  position: absolute;
  bottom: 5px;
  right: 5px;
  z-index: 100;
  color: #006400;

  a {
    color: #fff;
    font-size: 11px;
    text-decoration: none;

    &:hover {
      color: #7cfc00;
    }
  }
}
</style>
