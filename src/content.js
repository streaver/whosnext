import ContentBackgroundCommunicationService from './services/content-background-communication';

const browser = require('webextension-polyfill');

browser.runtime.onMessage.addListener(ContentBackgroundCommunicationService.handleAction);
