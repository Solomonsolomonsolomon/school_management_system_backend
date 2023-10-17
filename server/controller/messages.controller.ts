let instance: any;
class MessagesController {
  constructor() {
    if (instance) return instance;
    instance = this;
  }
}

export default Object.freeze(new MessagesController());
