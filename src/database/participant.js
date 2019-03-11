import database from './index';

const position = () => parseInt(Math.random() * 1000000, 0);
const participantId = details =>
  details.sortKey
    .replace(details.participantId, '')
    .trim()
    .replace(/\s/g, '-')
    .toLowerCase();

export default class Participant {
  constructor(id, meetingId, { hasSpoken = false, details }) {
    this.id = id;
    this.hasSpoken = hasSpoken;
    this.details = details;
    this.ref = database
      .collection('meetings')
      .doc(meetingId)
      .collection('participants')
      .doc(id);
  }

  async findOrCreate() {
    const data = { details: this.details };
    const options = {};

    if (await this.exists()) {
      options.merge = true;
    } else {
      data.hasSpoken = this.hasSpoken;
      data.position = position();
    }

    await this.ref.set(data, options);

    return this;
  }

  async delete() {
    return this.ref.delete();
  }

  async exists() {
    return (await this.ref.get()).exists;
  }

  static fromDetails(meeting, details) {
    if (!meeting) throw new Error('Meeting must be present');
    if (!details) throw new Error('Meeting details must be present');
    if (!details.sortKey) throw new Error('Meeting details must contain sortKey');
    if (!details.participantId) throw new Error('Meeting details must contain participantId');

    const id = participantId(details);
    const meetingId = meeting.id;

    return new Participant(id, meetingId, { details });
  }
}
