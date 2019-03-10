import database from './index';

const MEETING_HOSTS_TYPES_MAPPING = {
  'meet.google.com': 'GOOGLE_MEET',
};

const idGetter = url => url.pathname.replace('/', '');
const typeGetter = url => MEETING_HOSTS_TYPES_MAPPING[url.host];

export default class Meeting {
  constructor(id, { type }) {
    this.id = id;
    this.type = type;
    this.ref = database.collection('meetings').doc(id);
  }

  async findOrCreate() {
    await this.ref.set({ type: this.type }, { merge: true });

    return this;
  }

  async delete() {
    return this.ref.delete();
  }

  static fromUrl(str) {
    if (!str) throw new Error('String must be a valid meeting URL');

    const url = new URL(str);
    const meetingId = idGetter(url);
    const meetingType = typeGetter(url);

    return new Meeting(meetingId, { type: meetingType });
  }
}
