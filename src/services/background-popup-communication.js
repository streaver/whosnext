const WHOSNEXT_LS_MEETING_ID_KEY = 'whosnext:meeting-id';

function setMeetingId(meetingId) {
  window.localStorage.setItem(WHOSNEXT_LS_MEETING_ID_KEY, meetingId);
}

function getMeetingId() {
  return window.localStorage.getItem(WHOSNEXT_LS_MEETING_ID_KEY);
}

function removeMeetingId() {
  window.localStorage.removeItem(WHOSNEXT_LS_MEETING_ID_KEY);
}

export default { setMeetingId, getMeetingId, removeMeetingId };
