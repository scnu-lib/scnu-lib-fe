export const serverUrl = 'https://lib.scnu.life/api'; // 'https://lib.scnu.life/api' //服务器地址
export enum volunteerApplicationState {
  applied = 'APPLIED',
  accepted = 'ACCEPTED',
  rejected = 'REJECTED',
  pending = 'PENGDING'
}

export enum role {
  user = 'ROLE_USER',
  librarian = 'ROLE_LIBRARIAN',
  admin = 'ROLE_ADMIN',
}
export enum actLabel {
  readingClub = '读书会',
  offline = '线下',
  online = '线上',
  fridayCinema = '周五影院',
  seniorSharingMeeting = '师兄师姐说',
  pictureBookStory = '绘本故事',
  filmSalon = '观影沙龙',
  all = '全部',
}
export const photoUrl = '@/photo/封面示例.png';
