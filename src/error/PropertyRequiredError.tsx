// 对象属性缺少error

import ValidationError from './ValidationError';

class PropertyRequiredError extends ValidationError {
  constructor(property: string) {
    super('No property: ' + property);
    this.property = property;
  }
}

export function checkActProperty(act: object) {
  if (!act?.hasOwnProperty('id')) {
    // 好坑，id=== 0时候不能直接用id判断
    throw new PropertyRequiredError('id');
  } else if (!act?.hasOwnProperty('title')) {
    throw new PropertyRequiredError('title');
  } else if (!act?.hasOwnProperty('startTime')) {
    throw new PropertyRequiredError('startTime');
  } else if (!act?.hasOwnProperty('endTime')) {
    throw new PropertyRequiredError('endTime');
  } else if (!act?.hasOwnProperty('signUpDeadline')) {
    throw new PropertyRequiredError('signUpDeadline');
  } else if (!act?.hasOwnProperty('maxParticipant')) {
    throw new PropertyRequiredError('maxParticipant');
  } else if (!act?.hasOwnProperty('location')) {
    throw new PropertyRequiredError('location');
  } else if (!act?.hasOwnProperty('labels')) {
    throw new PropertyRequiredError('labels');
  }
}
export default PropertyRequiredError;
