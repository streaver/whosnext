<template>
  <div>
    <h1 class="header header--medium white-color">No Meet call in progress yet...</h1>
    <a
      class="meet-link white-bg centered rounded-border-50 link--no-decoration"
      href="https://meet.google.com/"
      target="_blank"
    >Start Call</a>
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding-top: 20px;
  font-weight: 400;
  text-align: center;
}

.header--medium {
  font-size: 22px;
}

.white-color {
  color: #fff;
}

.white-bg {
  background: #fff;
}

.rounded-border-50 {
  border-radius: 50px;
}

.meet-link {
  padding: 15px;
  width: 60px;
  height: 60px;
  font-size: 14px;
  line-height: 4.4;
  position: absolute;
  top: 50%;
  left: 50%;
  color: #39b54a;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform-origin: 50% 50%;
  transition: all 0.2s ease-in-out;

  &:hover {
    width: 70px;
    height: 70px;
    line-height: 5;
    font-weight: 600;
    line-height: 4.8;
    font-size: 15px;
    box-shadow: 2px 2px 3px 3px rgba(0, 0, 0, 0.2);
  }
}
</style>
