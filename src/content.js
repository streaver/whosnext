import { GET_USER_DATA } from './constants';

const USER_SELECTOR = '[data-participant-id]';

chrome.runtime.onMessage.addListener(async (msg, _, sendResponse) => {
  if (msg.action === GET_USER_DATA) {
    const userElement = document.querySelector(USER_SELECTOR);

    if (userElement) {
      return sendResponse(userElement.dataset);
    }
  }

  return undefined;
});
