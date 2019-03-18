const WHOSNEXT_LS_MEETING_ID_KEY = 'whosnext:meeting-id';
const WHOSNEXT_LS_PARTICIPANT_ID = 'whosnext:participant-id';

function setMeetingId(meetingId) {
  window.localStorage.setItem(WHOSNEXT_LS_MEETING_ID_KEY, meetingId);
}

function getMeetingId() {
  return window.localStorage.getItem(WHOSNEXT_LS_MEETING_ID_KEY);
}

function removeMeetingId() {
  window.localStorage.removeItem(WHOSNEXT_LS_MEETING_ID_KEY);
}

function setParticipantId(participantId) {
  window.localStorage.setItem(WHOSNEXT_LS_PARTICIPANT_ID, participantId);
}

function getParticipantId() {
  return window.localStorage.getItem(WHOSNEXT_LS_PARTICIPANT_ID);
}

function removeParticipantId() {
  window.localStorage.removeItem(WHOSNEXT_LS_PARTICIPANT_ID);
}

export default {
  setMeetingId,
  getMeetingId,
  removeMeetingId,
  setParticipantId,
  getParticipantId,
  removeParticipantId,
};
