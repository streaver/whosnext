import ContentBackgroundCommunicationService from './services/content-background-communication';

chrome.runtime.onMessage.addListener(ContentBackgroundCommunicationService.handleAction);
