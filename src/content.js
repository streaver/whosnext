import { contentMessageHandler } from './services/content-background-communication';

chrome.runtime.onMessage.addListener(contentMessageHandler);
