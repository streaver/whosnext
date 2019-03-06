const peopleSelector = '[data-participant-id]';
let participantsPresent;

function getParticipants() {
  return Array.from(document.querySelectorAll(peopleSelector)).map(e => e.dataset.sortKey.replace(/ spaces.*/, ''));
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.text) {
    case 'check_if_on_call':
      participantsPresent = document.querySelectorAll(peopleSelector);
      console.info(`1. CHECKING_IF ON CALL: ${participantsPresent.length}`);

      sendResponse({ onCall: participantsPresent.length > 0 });
      break;
    case 'update_participants':
      console.info(`2. RETURNING PARTICIPANTS: ${getParticipants()}`);

      sendResponse(getParticipants());
      break;
    default:
      break;
  }
  Promise.resolve();
});
