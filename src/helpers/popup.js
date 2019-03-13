const browser = require('webextension-polyfill');

const LIVE_TEXT = 'LIVE';

function setLive() {
  browser.browserAction.setBadgeText({ text: LIVE_TEXT });
  browser.browserAction.setBadgeBackgroundColor({ color: '#39B54A' });
}

function clearBadgeStatus() {
  browser.browserAction.setBadgeText({ text: '' });
}

export default { setLive, clearBadgeStatus };
