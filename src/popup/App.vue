<template>
  <div class="extension">
    <div v-if="callIsInProgress">
      <h1 class="header header--medium">👩‍💻 Currently on call 👨‍💻</h1>
      <div class="container rounded-border-10">
        <div id="participants">
          <div
            v-for="participant in participants"
            v-bind:key="participant.sortKey"
            class="speaker-card"
            v-bind:class="{ 'speaker-card--spoke': participant.position > current, 'speaker-card--active': participant.position === current }">{{ participant.sortKey }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="header header--medium">No Meet call in progress yet...</h1>
      <div class="meet-link centered rounded-border-50">
        <a class="link--no-decoration" href="https://meet.google.com/" target="_blank">Start Call</a>
      </div>
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
  background-color: #39b54a;
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
  font-family: 'Montserrat';
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
  font-family: 'Montserrat';
  font-weight: 300;
}

.speaker-card--active {
  border-color: #39b54a;
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
  padding: 10px;
  width: 60px;
  height: 60px;
  line-height: 5;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);

  &:hover {
    background-color: rgba(255, 248, 237, 0.8);
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
