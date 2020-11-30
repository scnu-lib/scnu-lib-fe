import { get } from '@/Utils/request';
import { serverUrl } from '@/Utils/config';

export const listUserApi = (page: number = 0, size: number = 20) => {
  return get(`${serverUrl}/account​/accounts/`, { page, size });
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
