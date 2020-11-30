import { del, get, post, put } from '@/Utils/request';
import { serverUrl, volunteerApplicationState } from '@/Utils/config';

export const listActApi = (
  label: string,
  page: number = 0,
  size: number = 20,
) => {
  return get(`${serverUrl}/activity/activities`, { label, page, size });
};

export const createActApi = (act: object) => {
  return post(`${serverUrl}/activity/activities`, { ...act });
};

export const detailApi = (activityID: number) => {
  return get(`${serverUrl}/activity/activities/${activityID}`, { activityID });
};

export const changeActApi = (activityID: number, newAct: object) => {
  return put(
    `${serverUrl}/activity/activities/${activityID}`,
    { activityID },
    newAct,
  );
};

export const actSignUpApi = (activityID: number, userID: number) => {
  return put(
    `${serverUrl}/activity/activities/${activityID}/sign-up/${userID}`,
    { activityID, userID },
  );
};

export const actSignInApi = (activityID: number, userID: number) => {
  return put(
    `${serverUrl}/activity/activities/${activityID}/sign-in/${userID}`,
    { activityID, userID },
    { userID },
  );
};

export const delVolApi = (activityID: number, userID: number) => {
  return del(
    `${serverUrl}/activity/activities/${activityID}/volunteer/${userID}`,
    { activityID, userID },
  );
};

export const userVolSignUpApi = (
  activityID: number,
  userID: number,
  state: volunteerApplicationState,
  reason: string = 'null',
) => {
  return put(
    `${serverUrl}/activity/activities/${activityID}/volunteer-application/${userID}`,
    { state, reason },
  );
};
