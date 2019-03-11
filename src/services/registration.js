import Meeting from '../database/meeting';
import Participant from '../database/participant';

async function registerUser(url, details) {
  const meeting = await Meeting.fromUrl(url).findOrCreate();

  return Participant.fromDetails(meeting, details).findOrCreate();
}

async function unregisterUser(url, details) {
  const meeting = await Meeting.fromUrl(url).findOrCreate();
  const participant = await Participant.fromDetails(meeting, details).findOrCreate();

  return participant.delete();
}

export default { registerUser, unregisterUser };
