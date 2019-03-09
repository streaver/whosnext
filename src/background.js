import database from './database';
import { GET_USER_DATA } from './constants';

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

function buildParticipantRef(meetingId, userData) {
  const userKey = userData.sortKey
    .replace(userData.participantId, '')
    .trim()
    .replace(/\s/g, '-')
    .toLowerCase();

  return database
    .collection('meetings')
    .doc(meetingId)
    .collection('participants')
    .doc(userKey);
}

async function registerUser(userData, meetingId) {
  const position = parseInt(Math.random() * 1000000, 0);
  const participantRef = buildParticipantRef(meetingId, userData);
  const participantDoc = await participantRef.get();

  if (participantDoc.exists) {
    return participantRef.set({ ...userData }, { merge: true });
  }

  return participantRef.set({ ...userData, hasSpoken: false, position });
}

async function unregisterUser(userData, meetingId) {
  const participantRef = buildParticipantRef(meetingId, userData);

  return participantRef.delete();
}

chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
  const url = new URL(tab.url);

  if (isCallTab(tab.status, url.host, GOOGLE_MEET_HOST)) {
    const meetingId = url.pathname.replace('/', '');

    if (!ACTIVE_CALL_TABS.includes(tabId)) {
      ACTIVE_CALL_TABS.push(tabId);
      ACTIVE_CALL_TABS_MAPPING[tabId] = tab;
    }

    const userData = await getUserData(tabId);

    if (userData) {
      USER_DATA_CACHE[tabId] = userData;

      await registerUser(userData, meetingId);
    }
  }
});

chrome.tabs.onRemoved.addListener(async tabId => {
  const tabPosition = ACTIVE_CALL_TABS.indexOf(tabId);

  if (tabPosition !== -1) {
    const tab = ACTIVE_CALL_TABS_MAPPING[tabId];
    const url = new URL(tab.url);
    const meetingId = url.pathname.replace('/', '');
    const userData = await getUserData(tabId, { useCache: true });

    unregisterUser(userData, meetingId);

    ACTIVE_CALL_TABS.splice(tabPosition, 1);
  }
});
