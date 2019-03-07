const meetURLRegex = /^https?:\/\/meet.google.com\/\w+-\w+-\w+/;

function isMeetTab(tab) {
  if (meetURLRegex.test(tab.url) && tab.status === 'complete') {
    return true;
  }

  return false;
}

function updatePopup(participants) {
  chrome.runtime.sendMessage({
    text: 'update_participants',
    data: {
      participants,
    },
  });
}

function infoFromDom(participants) {
  console.info(`Participants in meeting:\n ${participants}`);

  updatePopup(participants);
}

function updateParticipants(tabId) {
  chrome.tabs.sendMessage(tabId, { text: 'check_if_on_call' }, res => {
    console.info(`2. Checking if I'm on call result: ${JSON.stringify(res)}`);

    if (res.onCall === true) {
      console.info('3. > Updating participants on call...');
      chrome.tabs.sendMessage(tabId, { text: 'update_participants' }, infoFromDom);
    }
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.info('1. Tabs are being updated...');

  if (isMeetTab(tab)) {
    updateParticipants(tabId);
  }

  console.info('4. Reached the end of tabs Update!');
});
