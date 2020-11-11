// 自定义error消除this.name = ''
class Myerror extends Error{
    constructor(message){
        super(message);
        this.name = this.constructor.name;
    }
}
export default Myerror