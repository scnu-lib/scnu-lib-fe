import PropertyRequiredError, {
  checkActProperty,
} from '@/error/PropertyRequiredError';
import { detailApi } from '@/Services/activity';
import { message } from 'antd';

const initState = {
  id: 0,
  title: '',
  startTime: '',
  content: '',
  endTime: '',
  signUpDeadline: '',
  maxParticipant: 0,
  currentParticipant: 0,
  location: '',
  issign: true,
  src: '',
  labels: [''],
};
const actDetailReducer = (
  state: any = initState,
  action: { type: string; data: any },
) => {
  switch (action.type) {
    case 'INIT_ACTIVITY':
      return action.data;
    case 'CHANGE_ACTIVITY':
      return action.data;
    default:
      return state;
  }
};

export const initActDetail = data => {
  return {
    type: 'INIT_ACTIVITY',
    data,
  };
};

export default actDetailReducer;
