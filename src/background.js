import RegistrationService from './services/registration';
import CallTabPersistanceService from './services/call-tab-persistance';
import BackgroundPopupCommunicationService from './services/background-popup-communication';
import ContentBackgroundCommunicationService from './services/content-background-communication';

const browser = require('webextension-polyfill');

const GOOGLE_MEET_HOST = 'meet.google.com';

function isCallTab(status, host, serviceHost) {
  return host === serviceHost && status === 'complete';
}

browser.tabs.onUpdated.addListener(async (tabId, _, tab) => {
  const url = new URL(tab.url);

  if (isCallTab(tab.status, url.host, GOOGLE_MEET_HOST)) {
    const meetingId = url.pathname.replace('/', '');
    const details = await ContentBackgroundCommunicationService.sendAction(tabId, ContentBackgroundCommunicationService.GET_USER_DETAILS_ACTION_NAME);

    BackgroundPopupCommunicationService.setMeetingId(meetingId);

    if (details) {
      CallTabPersistanceService.save(tab, meetingId, details);
      await RegistrationService.registerUser(tab.url, details);

      browser.browserAction.setBadgeText({ text: 'LIVE' });
      browser.browserAction.setBadgeBackgroundColor({ color: '#39B54A' });
    } else {
      const tabData = CallTabPersistanceService.find(tab.id);

      if (tabData) {
        BackgroundPopupCommunicationService.removeMeetingId();
        RegistrationService.unregisterUser(tabData.tabUrl, tabData.userDetails);
        CallTabPersistanceService.remove(tabData.tabId);
        browser.browserAction.setBadgeText({ text: '' });
      }
    }
  }
});

browser.tabs.onRemoved.addListener(async tabId => {
  const tab = CallTabPersistanceService.find(tabId);

  if (tab) {
    BackgroundPopupCommunicationService.removeMeetingId();
    RegistrationService.unregisterUser(tab.tabUrl, tab.userDetails);
    CallTabPersistanceService.remove(tabId);
  }
});
