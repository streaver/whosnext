const browser = require('webextension-polyfill');

const GET_USER_DETAILS_ACTION_NAME = 'GET_USER_DETAILS_ACTION';
const GET_USER_DETAILS_ACTION = document => {
  const userElement = document.querySelector('[data-participant-id]');

  return userElement ? userElement.dataset : undefined;
};

const CONTENT_ACTIONS = {
  [GET_USER_DETAILS_ACTION_NAME]: GET_USER_DETAILS_ACTION,
};

async function handleAction(message) {
  const actionResponse = CONTENT_ACTIONS[message.action](document);

  return actionResponse;
}

async function sendAction(tabId, action) {
  return browser.tabs.sendMessage(tabId, { action }).then(response => response);
}

export default { handleAction, sendAction, GET_USER_DETAILS_ACTION_NAME };
