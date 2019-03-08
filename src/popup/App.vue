<template>
  <div class="extension">
    <div v-if="onCall">
      <h1 class="header header--medium">👩‍💻 Currently on call 👨‍💻</h1>
      <div class="container rounded-border-10">
        <div id="participants">
          <div v-bind:key="participant.name" v-for="participant in participants" class="speaker-card" v-bind:class="{ 'speaker-card--spoke': participant.position > current, 'speaker-card--active': participant.position === current }">
            {{ participant.name }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="header header--medium">No Meet call in progress yet...</h1>
      <div class="meet-link centered rounded-border-50">
        <a class="link--no-decoration" href="https://meet.google.com/" target="_blank">Start Call</a>
      </div>
    </div>

    <span class="powered-by">Powered by <i><a href="https://www.streaver.com" target="_blank">Streaver.</a></i></span>
  </div>
</template>

<script>
debugger;
export default {
  data() {
    return {
      onCall: false,
      current: 0,
      participants: []
        // {
        //   name: 'Larry',
        //   position: 1,
        // },
    };
  },
  mounted() {
    const participantsOnStorage = localStorage.getItem('whosnext-participants');

    if (participantsOnStorage) {
      this.onCall = true;
      this.participants = JSON.parse(participantsOnStorage);
    }
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
    background-color: rgba(255,248, 237, .6); /* #FFF8ED */
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
    background-color: rgba(255,248, 237, .5);
    padding: 5px;
    width: 200px;
    margin-bottom: 5px;
    border-radius: 5px;
    border: solid 1px #ABB1B3;
    height: 20px;
    font-size: 13px;
    font-family: 'Montserrat';
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
    border-color: rgba(255,248, 237, .2);
    background-color: rgba(255,248, 237, .3);
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
      background-color: rgba(255,248, 237, .8);
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
