/* eslint-disable no-use-before-define */

const browser = require('webextension-polyfill');

const GET_USER_DETAILS = 'GET_USER_DETAILS';

const ACTIONS = [
  {
    name: GET_USER_DETAILS,
    target: 'content',
    handler: () => {
      const userElement = document.querySelector('[data-participant-id]');

      return userElement ? userElement.dataset : undefined;
    },
  },
];

const BACKGROUND_ACTIONS = ACTIONS.filter(({ target }) => target === 'background');
const CONTENT_ACTIONS = ACTIONS.filter(({ target }) => target === 'content');

async function sendMessageToTab(action, tabId) {
  return browser.tabs.sendMessage(tabId, { action }).then(response => response);
}

async function sendMessageToBackground(action) {
  return browser.runtime.sendMessage({ action }).then(response => response);
}

async function messageHandler(actionsList, actionName, sender) {
  const actionHandler = actionsList.find(({ name }) => name === actionName).handler;

  return actionHandler(sender);
}

async function handleMessageFromTab(message, sender) {
  return messageHandler(BACKGROUND_ACTIONS, message.action, sender);
}

async function handleMessageFromBackground(message, sender) {
  return messageHandler(CONTENT_ACTIONS, message.action, sender);
}

export default {
  sendMessageToTab,
  sendMessageToBackground,
  handleMessageFromTab,
  handleMessageFromBackground,
};

export const actions = {
  GET_USER_DETAILS,
};
