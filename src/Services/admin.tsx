import { get } from '@/Utils/request';
import { serverUrl } from '@/Utils/config';

export const listUserApi = (size: number = 999) => {
  return get(`${serverUrl}/account/accounts`, { size, sort: 'id' });
};

export const listActParticipantsApi = (
  activityID: number,
  page: number,
  size: number,
) => {
  return get(`${serverUrl}/activity/activities/${activityID}/sign-up`, {
    activityID,
    page,
    size,
  });
};

export const listActVolAppliesApi = (activityID: number) => {
  return get(
    `${serverUrl}/activity/activities/${activityID}/volunteer-application`,
    { activityID },
  );
};
