import RegistrationService from './services/registration';
import CallTabPersistanceService from './services/call-tab-persistance';
import BackgroundPopupCommunicationService from './services/background-popup-communication';
import ContentBackgroundCommunicationService, { actions } from './services/content-background-communication';
import Popup from './helpers/popup';

const browser = require('webextension-polyfill');

const GOOGLE_MEET_HOST = 'meet.google.com';

function isCallTab(status, host, serviceHost) {
  return host === serviceHost && status === 'complete';
}

browser.tabs.onUpdated.addListener(async (tabId, _, tab) => {
  const url = new URL(tab.url);

  if (isCallTab(tab.status, url.host, GOOGLE_MEET_HOST)) {
    const meetingId = url.pathname.replace('/', '');
    const details = await ContentBackgroundCommunicationService.sendMessageToTab(actions.GET_USER_DETAILS, tabId);

    BackgroundPopupCommunicationService.setMeetingId(meetingId);

    if (details) {
      CallTabPersistanceService.save(tab, meetingId, details);
      const participant = await RegistrationService.registerUser(tab.url, details);

      BackgroundPopupCommunicationService.setParticipantId(participant.id);

      Popup.setLive();
    } else {
      const tabData = CallTabPersistanceService.find(tab.id);

      if (tabData) {
        BackgroundPopupCommunicationService.removeMeetingId();
        BackgroundPopupCommunicationService.removeParticipantId();
        RegistrationService.unregisterUser(tabData.tabUrl, tabData.userDetails);
        CallTabPersistanceService.remove(tabData.tabId);

        Popup.clearBadgeStatus();
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
    Popup.clearBadgeStatus();
  }
});
