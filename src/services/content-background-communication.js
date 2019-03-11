const GET_USER_DETAILS_ACTION_NAME = 'GET_USER_DETAILS_ACTION';
const GET_USER_DETAILS_ACTION = document => {
  const userElement = document.querySelector('[data-participant-id]');

  return userElement ? userElement.dataset : undefined;
};

const CONTENT_ACTIONS = {
  [GET_USER_DETAILS_ACTION_NAME]: GET_USER_DETAILS_ACTION,
};

async function handleAction(message, sender, sendResponse) {
  const actionResponse = CONTENT_ACTIONS[message.action](document);

  return sendResponse(actionResponse);
}

async function sendAction(tabId, action) {
  return new Promise(resolve => {
    chrome.tabs.sendMessage(tabId, { action }, response => resolve(response));
  });
}

export default { handleAction, sendAction, GET_USER_DETAILS_ACTION_NAME };
