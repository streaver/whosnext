<template>
  <div class="extension">
    <Loading v-bind:is-loading="isLoading"></Loading>

    <div v-if="callIsInProgress" class="particles-bg">
      <div class="header-container">
        <h1 class="header header--medium white-color">👩‍💻 Currently on call 👨‍💻</h1>
      </div>
      <div class="container rounded-border-3">
        <div id="participants">
          <div
            v-for="participant in participantsHadSpoken"
            v-bind:key="participant.details.sortKey"
            class="speaker-card speaker-card--spoke"
          >
            {{ participant.details.sortKey | prettifyParticipantName }}
          </div>

          <span>Next...</span>
          <span class="splitter--line"></span>
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
      <StartCall></StartCall>
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
import Loading from '../components/Loading';
import StartCall from '../components/StartCall';

import BackgroundPopupCommunicationService from '../services/background-popup-communication';

export default {
  components: {
    Loading,
    StartCall
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
    prettifyParticipantName(name) {
      return name.replace(/ spaces.*/, '');
    }
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
          this.participants = collection.docs.map(participantDoc => participantDoc.data());

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
    background-image: linear-gradient(45deg, rgba(37, 165, 200, .5) 0%, #39B54A 65%); // #25A5c8
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

  .splitter--line {
    padding: 2px;
    border-bottom: 1px dotted rgba(0, 0, 0, 0.5);
    width: 100%;
    margin-top: 0px;
    margin-bottom: 10px;
    display: block;
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

  .white-color {
    color: #FFF;
  }
</style>
