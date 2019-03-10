import RegistrationService from './services/registration';
import BackgroundPopupCommunicationService from './services/background-popup-communication';
import ContentBackgroundCommunicationService from './services/content-background-communication';

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

  return ContentBackgroundCommunicationService.sendAction(tabId, ContentBackgroundCommunicationService.GET_USER_DETAILS_ACTION_NAME);
}

chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
  const url = new URL(tab.url);

  if (isCallTab(tab.status, url.host, GOOGLE_MEET_HOST)) {
    const meetingId = url.pathname.replace('/', '');

    BackgroundPopupCommunicationService.setMeetingId(meetingId);

    if (!ACTIVE_CALL_TABS.includes(tabId)) {
      ACTIVE_CALL_TABS.push(tabId);
      ACTIVE_CALL_TABS_MAPPING[tabId] = tab;
    }

    const details = await getUserData(tabId);

    if (details) {
      USER_DATA_CACHE[tabId] = details;

      await RegistrationService.registerUser(tab.url, details);
    }
  }
});

chrome.tabs.onRemoved.addListener(async tabId => {
  const tabPosition = ACTIVE_CALL_TABS.indexOf(tabId);

  if (tabPosition !== -1) {
    const tab = ACTIVE_CALL_TABS_MAPPING[tabId];

    BackgroundPopupCommunicationService.removeMeetingId();

    const details = await getUserData(tabId, { useCache: true });

    RegistrationService.unregisterUser(tab.url, details);

    ACTIVE_CALL_TABS.splice(tabPosition, 1);
  }
});
