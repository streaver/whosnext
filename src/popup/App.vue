<template>
  <div class="extension">
    <div v-if="loading" class="loading-overlay">
      <h1 class="header white-color centered">Stay tight...</h1>
      <div class="loader white-color">Loading...</div>
      <h2 class="white-color centered font-light">looking for meet calls...</h2>
    </div>
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
      <h1 class="header header--medium white-color">No Meet call in progress yet...</h1>

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
      loading: null,
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

  created() {
    const meetingId = BackgroundPopupCommunicationService.getMeetingId();

    if (meetingId) {
      this.loading = true;

      database
        .collection('meetings')
        .doc(meetingId)
        .collection('participants')
        .onSnapshot(collection => {
          this.participants = collection.docs.map(participantDoc => participantDoc.data());

          // When subscribing always returns the whole result which can be empty if I'm the first participant on call
          if (this.participants.length > 0) {
            this.loading = false;
          } else {
            setTimeout(() => {
              this.loading = false;
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

  .rounded-border-50 {
    border-radius: 50px;
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

  .white-color {
    color: #FFF;
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
    background-image: linear-gradient(45deg, #25A5C8 0%, #39B54A 65%);
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
