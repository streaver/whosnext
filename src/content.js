const peopleSelector = '[data-participant-id]';
let participantsPresent;

function whoAmI() {
  let me = null;
  const participants = Array.from(document.querySelectorAll(peopleSelector));

  for (let i = 0; i < participants.length; i += 1) {
    if (participants[i].querySelectorAll('[data-self-name="You"]').length === 1) {
      me = participants[i].dataset.sortKey.replace(/ spaces.*/, '');
      console.info(`This is me: ${me}`);
      break;
    }
  }

  return me;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.text) {
    case 'check_if_on_call':
      participantsPresent = document.querySelectorAll(peopleSelector);
      console.info(`1. CHECKING_IF ON CALL: ${participantsPresent.length}`);

      sendResponse({ onCall: participantsPresent.length > 0 });
      break;
    case 'update_participants':
      console.info(`2. RETURNING PARTICIPANTS: ${whoAmI()}`);

      sendResponse(whoAmI());
      break;
    default:
      break;
  }
  Promise.resolve();
});
