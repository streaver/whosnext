import { registerUser, unregisterUser } from './services/registration';
import { GET_USER_DATA, WHOSNEXT_LS_MEETING_ID_KEY } from './constants';

const GOOGLE_MEET_HOST = 'meet.google.com';
const ACTIVE_CALL_TABS = [];
const ACTIVE_CALL_TABS_MAPPING = {};
const USER_DATA_CACHE = {};

function isCallTab(status, host, serviceHost) {
  return host === serviceHost && status === 'complete';
}

async function getUserData(tabId, options = { useCache: false }) {
  if (options.useCache) {
    return USER_DATA_CACHE[tabId];
  }

  return new Promise(resolve => {
    chrome.tabs.sendMessage(tabId, { action: GET_USER_DATA }, userData => {
      resolve(userData);
    });
  });
}

chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
  const url = new URL(tab.url);

  if (isCallTab(tab.status, url.host, GOOGLE_MEET_HOST)) {
    const meetingId = url.pathname.replace('/', '');

    window.localStorage.setItem(`${WHOSNEXT_LS_MEETING_ID_KEY}`, meetingId);

    if (!ACTIVE_CALL_TABS.includes(tabId)) {
      ACTIVE_CALL_TABS.push(tabId);
      ACTIVE_CALL_TABS_MAPPING[tabId] = tab;
    }

    const details = await getUserData(tabId);

    if (details) {
      USER_DATA_CACHE[tabId] = details;

      await registerUser(tab.url, details);
    }
  }
});

chrome.tabs.onRemoved.addListener(async tabId => {
  const tabPosition = ACTIVE_CALL_TABS.indexOf(tabId);

  if (tabPosition !== -1) {
    const tab = ACTIVE_CALL_TABS_MAPPING[tabId];

    window.localStorage.removeItem(`${WHOSNEXT_LS_MEETING_ID_KEY}`);

    const details = await getUserData(tabId, { useCache: true });

    unregisterUser(tab.url, details);

    ACTIVE_CALL_TABS.splice(tabPosition, 1);
  }
});
