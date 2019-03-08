const meetURLRegex = /^https?:\/\/meet.google.com\/\w+-\w+-\w+/;
const activeMeetTabIds = [];

function isMeetTab(tab) {
  if (meetURLRegex.test(tab.url) && tab.status === 'complete') {
    return true;
  }

  return false;
}

// function updatePopup(participants) {
//   chrome.runtime.sendMessage({
//     text: 'update_participants',
//     data: {
//       participants,
//     },
//   });
// }

function infoFromDom(name) {
  console.info(`Participants in meeting:\n ${name}`);

  let currentParticipants = localStorage.getItem('whosnext-participants');

  if (currentParticipants) {
    if (currentParticipants.indexOf(name) === -1) {
      currentParticipants.push({
        name,
        position: currentParticipants.length,
      });
    }
  } else {
    currentParticipants = [
      {
        name,
        position: 1,
      },
    ];
  }

  console.log(`STORING PARTICIPANTS: ${JSON.stringify(currentParticipants)}`);
  localStorage.setItem('whosnext-participants', JSON.stringify(currentParticipants));
  // updatePopup(participants);
}

function updateParticipants(tabId) {
  chrome.tabs.sendMessage(tabId, { text: 'check_if_on_call' }, res => {
    console.info(`2. Checking if I'm on call result: ${JSON.stringify(res)}`);

    if (res.onCall === true && activeMeetTabIds.indexOf(tabId) === -1) {
      activeMeetTabIds.push(tabId);
      console.info('3. > Register me on call...');
      chrome.tabs.sendMessage(tabId, { text: 'update_participants' }, infoFromDom);
    }
  });
}

chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
  console.info('1. Tabs are being updated...');

  if (isMeetTab(tab)) {
    updateParticipants(tabId);
  }

  console.info('4. Reached the end of tabs Update!');
});

chrome.tabs.onRemoved.addListener(tabId => {
  const tabPosition = activeMeetTabIds.indexOf(tabId);

  if (tabPosition !== -1) {
    activeMeetTabIds.splice(tabPosition, 1);
    localStorage.removeItem('whosnext-participants');
  }
});
