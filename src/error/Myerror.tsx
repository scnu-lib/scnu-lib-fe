// 自定义error消除this.name = ''
class MyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
export default MyError;
