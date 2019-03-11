<template>
  <div class="extension">
    <div v-if="callIsInProgress">
      <h1 class="header header--medium">👩‍💻 Currently on call 👨‍💻</h1>
      <div class="container rounded-border-10">
        <div id="participants">
          <div
            v-for="participant in participantsHadSpoken"
            v-bind:key="participant.details.sortKey"
            class="speaker-card speaker-card--spoke"
          >
            {{ participant.details.sortKey | prettifyParticipantName }}
          </div>

          <span>Next...</span>
          <div
            v-for="(participant, index) in participantsToSpeak"
            v-bind:key="participant.details.sortKey"
            v-bind:class="{ 'speaker-card--active': index === 0 }"
            class="speaker-card"
          >
            {{ participant.details.sortKey | prettifyParticipantName }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="header header--medium">No Meet call in progress yet...</h1>

      <a class="meet-link centered rounded-border-50 link--no-decoration" href="https://meet.google.com/" target="_blank">Start Call</a>
    </div>

    <span class="powered-by">Powered by
      <i>
        <a href="https://www.streaver.com" target="_blank">Streaver.</a>
      </i>
    </span>
  </div>
</template>

<script>
import database from '../database/index';

import BackgroundPopupCommunicationService from '../services/background-popup-communication';

export default {
  data() {
    return {
      current: 0,
      participants: [],
    };
  },

  computed: {
    callIsInProgress() {
      return this.participants.length > 0;
    },

    participantsHadSpoken() {
      return this.participants.filter(
        participant => participant.hasSpoken
      ).sort((a, b) => {
        return a.position - b.position
      });
    },

    participantsToSpeak() {
      return this.participants.filter(
        participant => !participant.hasSpoken
      ).sort((a, b) => {
        return a.position - b.position
      });
    },
  },

   filters: {
    prettifyParticipantName: function (name) {
      return name.replace(/ spaces.*/, '');
    }
  },

  mounted() {
    const meetingId = BackgroundPopupCommunicationService.getMeetingId();

    database
      .collection('meetings')
      .doc(meetingId)
      .collection('participants')
      .onSnapshot(collection => {
        this.participants = collection.docs.map(participantDoc => participantDoc.data());
      });
  },
};
</script>

<style lang="scss" scoped>
.extension {
  background-color: #39B54A;
  background-size: cover;
  background-origin: border-box;
  background-repeat: no-repeat;
  min-height: 300px;
  height: 100%;
  width: 350px;
}

.container {
  background-color: rgba(255, 248, 237, 0.6); /* #FFF8ED */
  margin: auto;
  padding: 10px;
  min-height: 250px;
  width: 280px;
  margin-bottom: 30px;
}

.rounded-border-10 {
  border-radius: 10px;
}

.rounded-border-50 {
  border-radius: 50px;
}

.header {
  padding-top: 20px;
  font-weight: 400;
  text-align: center;
  color: white;
}

.header--medium {
  font-size: 22px;
}

.speaker-card {
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

.speaker-card--active {
  border-color: #39B54A;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 15px;

  &::before {
    content: '>';
  }
}

.speaker-card--spoke {
  color: gray;
  border-color: rgba(255, 248, 237, 0.2);
  background-color: rgba(255, 248, 237, 0.3);
}

.meet-link {
  background: white;
  padding: 15px;
  width: 60px;
  height: 60px;
  font-size: 14px;
  line-height: 4.4;
  position: absolute;
  top: 50%;
  left: 50%;
  color: #39B54A;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform-origin: 50% 50%;
  transition: all .2s ease-in-out;

  &:hover {
    width: 70px;
    height: 70px;
    line-height: 5;
    font-weight: 600;
    line-height: 4.8;
    font-size: 15px;
    box-shadow: 2px 2px 3px 3px rgba(0, 0, 0, .2);
  }
}

.link--no-decoration {
  text-decoration: none;
}

.centered {
  margin: auto;
  text-align: center;
}

.powered-by {
  font-size: 11px;
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>
