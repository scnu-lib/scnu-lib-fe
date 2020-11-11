// 对象属性缺少error

import ValidationError from './ValidationError';

class PropertyRequiredError extends ValidationError{
    constructor(property){
        super('No property: '+ property);
        this.property = property;
    }
}

export default PropertyRequiredError