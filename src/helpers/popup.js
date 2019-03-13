const browser = require('webextension-polyfill');

const LIVE_TEXT = 'LIVE';
const LIVE_ICON_PATH = '../icons/mic_128_live.png';
const DEFAULT_ICON_PATH = '../icons/mic_128.png';

function setLive() {
  browser.browserAction.setBadgeText({ text: LIVE_TEXT });
  browser.browserAction.setBadgeBackgroundColor({ color: '#39B54A' });
  browser.browserAction.setIcon({ path: LIVE_ICON_PATH });
}

function clearBadgeStatus() {
  browser.browserAction.setBadgeText({ text: '' });
  browser.browserAction.setIcon({ path: DEFAULT_ICON_PATH });
}

export default { setLive, clearBadgeStatus };
