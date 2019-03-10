const GET_USER_DETAILS_ACTION_NAME = 'GET_USER_DETAILS_ACTION';
const GET_USER_DETAILS_ACTION = document => {
  const userElement = document.querySelector('[data-participant-id]');

  return userElement ? userElement.dataset : undefined;
};

const CONTENT_ACTIONS = {
  [GET_USER_DETAILS_ACTION_NAME]: GET_USER_DETAILS_ACTION,
};

async function contentMessageHandler(message, sender, sendResponse) {
  const actionResponse = CONTENT_ACTIONS[message.action](document);

  return sendResponse(actionResponse);
}

async function contentMessageActionSender(tabId, action) {
  return new Promise(resolve => {
    chrome.tabs.sendMessage(tabId, { action }, resolve);
  });
}

export { contentMessageHandler, contentMessageActionSender, GET_USER_DETAILS_ACTION_NAME };
